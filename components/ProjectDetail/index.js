import Heading from "../Heading";
import { ColumnSection } from "../../styles";
import { RowSection } from "../../styles";
import Image from "next/image";
import BackIcon from "../Icon/BackIcon";
import { useRouter } from "next/router";
import StyledButton from "../StyledButton";
import ProjectForm from "../ProjectForm";
import { useState } from "react";
import dayjs from "dayjs";
import useSWR from "swr";
import { Main } from "../../styles";

export default function ProjectDetail({
  project,
  onDelete,
  onCancel,
  handleChangeProjectStatus,
  handleChangeProjectFeeling,
  id,
}) {
  const [isEdit, setIsEdit] = useState(false);
  const { mutate } = useSWR("/api/project");
  function onEdit() {
    setIsEdit(true);
  }
  const router = useRouter();

  async function handleProjectUpdate(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    const newStart = new Date(data.start);
    const newEnd = new Date(data.end);
    const newProject = {
      name: data.name,
      status: data.status,
      happiness: data.happiness,
      image: "/cumulustee.jpg",
      details: [
        {
          recipient: data.recipient,
          size: data.size,
          gauge: data.gauge,
          needleSize: data.needlesize,
          start: dayjs(newStart).format("DD-MM-YYYY"),
          end: dayjs(newEnd).format("DD-MM-YYYY"),
        },
      ],
      pattern: "",
      yarn: [
        {
          brand: data.brand,
          skeins: data.skeins,
          type: data.type,
          gramm: data.gramm,
          color: data.color,
          meter: data.meter,
        },
      ],
      note: "",
    };
    const response = await fetch(`/api/project?id=${id}`, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProject),
    });

    setIsEdit(!isEdit);
    mutate();
  }
  return (
    <>
      {isEdit ? (
        <Main>
          <Heading>
            <BackIcon
              handleGoBack={() => {
                router.push("/");
              }}
            />
            {project.name}
          </Heading>
          {project.name}
          <ProjectForm
            isEdit
            defaultValue={project}
            onCancel={onCancel}
            onSubmit={handleProjectUpdate}
            handleChangeProjectStatus={handleChangeProjectStatus}
            handleChangeProjectFeeling={handleChangeProjectFeeling}
            buttonContentLeft="Cancel"
            buttonContentRight="Confirm"
          />
        </Main>
      ) : (
        <Main>
          <Heading>
            <BackIcon
              handleGoBack={() => {
                router.push("/");
              }}
            />
            {project.name}
          </Heading>
          {/* <RowSection>
            <div>
              <p>Status</p>
              <span>{project.status}</span>
            </div>
            <div>
              <p>Feeling</p>
              <span>{project.happiness}</span>
            </div>
          </RowSection> */}
          <Image
            src={project.image}
            alt={project.name}
            width={350}
            height={350}
          />
          {`This project is ${project.status} and you feeling is ${project.happiness}`}
          <ColumnSection>
            Details
            <p>The project is for</p>
            <span>{project.details[0].recipient}</span>
            <p>Size</p>
            <span>{project.details[0].size}</span>
            <p>Gauge</p>
            <span>{project.details[0].gauge}</span>
            <p>Needle Size</p>
            <span>{project.details[0].needleSize}</span>
            <p>Start</p>
            <span>{project.details[0].start}</span>
            <p>End</p>
            <span>{project.details[0].end}</span>
          </ColumnSection>

          <ColumnSection>
            Yarn
            <p>Brand</p>
            <span>{project.yarn[0].brand}</span>
            <p>Skeins</p>
            <span>{project.yarn[0].skeins}</span>
            <p>Type</p>
            <span>{project.yarn[0].type}</span>
            <p>Gramm</p>
            <span>{project.yarn[0].gramm}</span>
            <p>Color</p>
            <span>{project.yarn[0].color}</span>
            <p>Meter</p>
            <span>{project.yarn[0].meter}</span>
          </ColumnSection>

          <RowSection>
            Note
            {project.note}
          </RowSection>
          <RowSection>
            <StyledButton
              width="8rem"
              height="3rem"
              onClick={() => onDelete(project._id)}
            >
              Delete
            </StyledButton>
            <StyledButton width="8rem" height="3rem" onClick={onEdit}>
              Edit
            </StyledButton>
          </RowSection>
        </Main>
      )}
    </>
  );
}
