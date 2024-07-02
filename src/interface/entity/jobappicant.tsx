import { JobApplicantStatus } from "../../enum/jobapplicantstatus"

export interface IJobApplicant{
    id?:string
    studentId:string
    jobId:string
    jobApplicantStatus:JobApplicantStatus
}