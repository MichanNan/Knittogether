import { ColoredFont, Main, StyledLink } from "../styles";

import UploadFile from "../components/Common/UploadFile";

export default function test() {
  return (
    <Main>
      <UploadFile />
    </Main>
  );
}

// const OverviewContainer = styled.div`
//   display: grid;
//   grid-template-columns: repeat(2, 50%);
//   grid-template-rows: repeat(2, 50%);
// `;

// const SubTitle = styled.p`
//   font-size: 1.2rem;
//   align-self: flex-start;
//   transform: translateX(2rem);
//   margin-top: ${({ top }) => top};
// `;

// const InfoWrapper = styled.div`
//   display: flex;
// `;

// const ActiveProjectContainer = styled.section`
//   width: 90%;
//   display: flex;
//   overflow-x: auto;
//   overflow-y: visible;
//   white-space: nowrap;
//   gap: 1rem;
//   position: relative;
//   top: 2rem;
//   margin: 0 2rem;
//   transform: translateY(-1rem);
// `;
// const ProjectItemWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
// `;

// const ImageContainer = styled.div`
//   width: 100%;
//   height: 100%;
//   position: relative;
//   object-fit: cover;
//   border-radius: 0.8rem;
//   overflow: hidden;
// `;
