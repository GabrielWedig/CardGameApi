import { FindOptionsWhere } from 'typeorm';
import { PaginationDto } from './dto/pagination.dto';

type Where<T> = FindOptionsWhere<T> | FindOptionsWhere<T>[];
type Text<T> = (search: string) => Where<T>;
type Number<T> = (search: number) => Where<T>;

interface BuildFilter<T> {
  search?: string;
  defaultWhere?: Where<T>;
  numberFilter?: Number<T>;
  textFilter?: Text<T>;
}

export function paginated(params: PaginationDto) {
  const page = params.page ?? 1;
  const limit = params.limit ?? 50;
  const skip = (page - 1) * limit;
  const take = limit;

  return { page, limit, take, skip };
}

export function buildFilter<T>({
  defaultWhere,
  search,
  numberFilter,
  textFilter,
}: BuildFilter<T>) {
  if (!search) return defaultWhere;

  const isNumber = !isNaN(Number(search));

  if (numberFilter && isNumber) {
    return numberFilter(Number(search));
  }
  if (textFilter && !isNumber) {
    return textFilter(search);
  }
}
