import { HttpService } from '@nestjs/axios';
import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { AxiosError } from 'axios';
import * as crypto from 'crypto';
import * as FormData from 'form-data';
import { catchError, firstValueFrom } from 'rxjs';

interface Response {
  secure_url: string;
  public_id: string;
}

@Injectable()
export class CloudinaryService {
  private readonly logger = new Logger(CloudinaryService.name);
  private readonly cloudName = process.env.CLOUDINARY_CLOUD_NAME!;
  private readonly apiKey = process.env.CLOUDINARY_API_KEY!;
  private readonly apiSecret = process.env.CLOUDINARY_API_SECRET!;
  private readonly baseUrl = `https://api.cloudinary.com/v1_1/${this.cloudName}`;

  constructor(private readonly httpService: HttpService) {}

  private generateSignature(params: Record<string, string | number>) {
    const sorted = Object.keys(params)
      .sort()
      .map((key) => `${key}=${params[key]}`)
      .join('&');

    return crypto
      .createHash('sha1')
      .update(`${sorted}${this.apiSecret}`)
      .digest('hex');
  }

  async uploadImage(fileBuffer: Buffer, folder: string) {
    const timestamp = Math.round(Date.now() / 1000);
    const params = { folder, timestamp };
    const signature = this.generateSignature(params);

    const formData = new FormData();
    formData.append('file', fileBuffer, { filename: 'image' });
    formData.append('api_key', this.apiKey);
    formData.append('timestamp', String(timestamp));
    formData.append('folder', folder);
    formData.append('signature', signature);

    const { data } = await firstValueFrom(
      this.httpService
        .post<Response>(`${this.baseUrl}/image/upload`, formData, {
          headers: formData.getHeaders(),
        })
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error);
            throw new BadRequestException(
              'Ocorreu um erro tentar subir a imagem',
            );
          }),
        ),
    );

    return {
      url: data.secure_url,
      publicId: data.public_id,
    };
  }

  async deleteImage(publicId: string) {
    const timestamp = Math.round(Date.now() / 1000);
    const params = { public_id: publicId, timestamp };
    const signature = this.generateSignature(params);

    const formData = new FormData();
    formData.append('public_id', publicId);
    formData.append('api_key', this.apiKey);
    formData.append('timestamp', String(timestamp));
    formData.append('signature', signature);

    await firstValueFrom(
      this.httpService
        .post<Response>(`${this.baseUrl}/image/destroy`, formData, {
          headers: formData.getHeaders(),
        })
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error);
            throw new BadRequestException(
              'Ocorreu um erro tentar excluir imagem antiga',
            );
          }),
        ),
    );
  }
}
