import { Schema, model } from "mongoose";
import { TCompany } from "./company.interface";

const companySchema = new Schema<TCompany>(
  {
    name: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const CompanyModel = model<TCompany>("Companys", companySchema);

export default CompanyModel;
