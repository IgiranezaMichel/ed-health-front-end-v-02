import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useJobContext } from "../../../../context/job";
import React from "react";
import { Button, Chip, Dialog, IconButton } from '@mui/material';
import { JobStatus } from '../../../../enum/jobStatus';
import { ViewHospitalJobApplicant } from './viewApplicant';
import { Close } from '@mui/icons-material';
import { JobApplicantProvider } from '../../../../context/jobApplicant';
import { JobApplicantStatus } from '../../../../enum/jobapplicantstatus';
import { ChangeJobStatus } from './changeJobStatus';
export const DisplayJob=()=>{
    const {current,update}=useJobContext();
    const [expanded, setExpanded] = React.useState<string | false>(false);
    const [jobStatus, setJobStatus] = React.useState<JobStatus>(JobStatus.OPEN);
    const [jobActionStatus, setJobActionStatus] = React.useState<JobStatus>(JobStatus.OPEN);
    const [openJobStatus, setOpenJobStatus] = React.useState(false);
    const [jobQualification, setJobQualification] = React.useState<JobApplicantStatus>(JobApplicantStatus.APPENDING);
    const [jobId, setJobId] = React.useState('');
    const [openJobApplicant, setOpenJobApplicant] = React.useState(false);
    const handleChange =
      (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        event.preventDefault();
        setExpanded(isExpanded ? panel : false);
      };
      const jobStatusHandler=(jobStatus:JobStatus)=>{
        setJobStatus(jobStatus);
        update(jobStatus);
      }
    return <>
    <section className="mb-2">
            <Button onClick={()=>jobStatusHandler(JobStatus.OPEN)} variant={jobStatus==JobStatus.OPEN?'contained':'text'} className="me-2">Open</Button>
            <Button onClick={()=>jobStatusHandler(JobStatus.CANCELLED)} variant={jobStatus==JobStatus.CANCELLED?'contained':'text'} className="me-2">Cancelled</Button>
            <Button onClick={()=>jobStatusHandler(JobStatus.OFFER_MADE)} variant={jobStatus==JobStatus.OFFER_MADE?'contained':'text'}className="me-2">Offer made</Button>
        </section>
    {current!=undefined&&current.length!=0&&current.map((data:any,index:number)=>{
        return  <Accordion expanded={expanded === 'panel'+index} onChange={handleChange('panel'+index)}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            <div className="small fw-bolder">Title</div>
            {data.title}
          </Typography>
         {jobStatus==JobStatus.OPEN&& <Typography sx={{ width: '33%', flexShrink: 0 }}>
            <div className="small fw-bolder">Total Applicant</div>
             2
          </Typography>}
          <Typography sx={{ color: 'text.secondary' ,width:'100%'}}>
            
            <div className='float-end'>
            <span className="small fw-bolder">{data.deadline}</span>
              <div>
             <b>status</b> {data.jobStatus==JobStatus.OPEN?'open':data.jobStatus==JobStatus.CANCELLED?'cancelled':'Offer made'}
              </div>
            </div>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography className="overflow-hidden">
            <div className="small fw-bolder">
                Description
            </div>
            <div  dangerouslySetInnerHTML={{__html:data.description}}></div>
            <div className="modal-footer">
              {(jobStatus==JobStatus.OPEN||jobStatus==JobStatus.OFFER_MADE)&&<Button onClick={()=>{setJobId(data.id);setOpenJobApplicant(true)}} className='bg-info text-white fw-bolder rounded-0 me-2'>view applicant</Button>}
              {(jobStatus!=JobStatus.CANCELLED&&jobStatus!=JobStatus.OFFER_MADE)&&<Button onClick={()=>{setJobId(data.id);setOpenJobStatus(true);setJobActionStatus(JobStatus.CANCELLED)}} className='bg-danger text-white fw-bolder rounded-0 me-2'>Cancel Job</Button>}
              {jobStatus==JobStatus.CANCELLED&&<Button onClick={()=>{setJobId(data.id);setOpenJobStatus(true);setJobActionStatus(JobStatus.OPEN)}} className='bg-success text-white fw-bolder rounded-0 me-2'>Activate Job</Button>}
              {(jobStatus!=JobStatus.OFFER_MADE)&&<Button onClick={()=>{setJobId(data.id);setOpenJobStatus(true);setJobActionStatus(JobStatus.OFFER_MADE)}} className='bg-primary text-white fw-bolder rounded-0 me-2'>Offer has made</Button>}
            </div>
          </Typography>
        </AccordionDetails>
      </Accordion>
    })}
    {current!=undefined&&current.length==0&&<div className='mt-5 '><Chip color='info' label='No data found'/></div>}
    {/* job applicant */} 
    <Dialog maxWidth='md' sx={{mx:{md:'10%'},width:'100%'}} PaperProps={{className:'col-12 w-100'}}open={openJobApplicant}>
      <JobApplicantProvider jobId={jobId} status={jobQualification}>
      <ViewHospitalJobApplicant>
      <section className='d-flex align-items-center justify-content-between p-2 sticky-top bg-white'>
        <div>Job detail</div>
        <IconButton onClick={()=>setOpenJobApplicant(false)}><Close/></IconButton>
      </section>
      <div className="text-center fw-bolder p-4">Job Applicant</div>
    <section className='p-2'>
    <Button onClick={()=>setJobQualification(JobApplicantStatus.APPENDING)} variant={jobQualification==JobApplicantStatus.APPENDING?'contained':'text'}>New </Button>
    <Button onClick={()=>setJobQualification(JobApplicantStatus.QUALIFY)}variant={jobQualification==JobApplicantStatus.QUALIFY?'contained':'text'}>Qualified </Button>
    <Button onClick={()=>setJobQualification(JobApplicantStatus.DISQUALIFY)} variant={jobQualification==JobApplicantStatus.DISQUALIFY?'contained':'text'}>Disqualified </Button>
    </section>
      </ViewHospitalJobApplicant>
      </JobApplicantProvider>
    </Dialog>
    {/* change job status */}
    <Dialog open={openJobStatus}>
      <ChangeJobStatus jobId={jobId} status={jobActionStatus}>
        <div className='d-flex align-items-center justify-content-between p-1 bg-success text-white'>
          <div>Change job status</div> <IconButton onClick={()=>setOpenJobStatus(false)}><Close/></IconButton>
        </div>
      </ChangeJobStatus>
    </Dialog>
        </>
}