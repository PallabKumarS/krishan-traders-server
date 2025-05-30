import { z } from "zod";

const createStatisticsValidation = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required",
    }),
  }),
});

const updateStatisticsValidation = createStatisticsValidation.partial();

export const StatisticsValidation = {
  createStatisticsValidation,
  updateStatisticsValidation,
};