import { Employer } from "../models/employer.model.js";

const createEmployer = async (employerData) => {
    const employer = await Employer.create(employerData);
    return employer;
}

export const employerServices = { createEmployer };