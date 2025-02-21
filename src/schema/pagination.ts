import { z } from "zod";

export type Pagination<TItems> = {
  limit: number;
  skip: number;
  total: number;
  items: TItems[];
};

export const Pagination = z.object({
  limit: z.number(),
  skip: z.number(),
  total: z.number(),
});

export interface PaginationState {
  pageIndex: number;
  pageSize?: number;
}
