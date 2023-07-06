import styled from "styled-components";
import css from "styled-jsx/css";

import { usePagination, DOTS } from "../usePagination";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

import { uid } from "uid";

export default function Pagination({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
}) {
  let paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  let lastPage = paginationRange[paginationRange.length - 1];

  const onNext = (currentPage) => {
    if (currentPage !== lastPage) {
      onPageChange(currentPage + 1);
    }
  };

  const onPrevious = () => {
    if (currentPage !== 1) {
      onPageChange(currentPage - 1);
    }
  };

  return (
    <PaginationContainer>
      <li onClick={() => onPrevious(currentPage)}>
        <FontAwesomeIcon icon={faChevronLeft}></FontAwesomeIcon>
      </li>

      {paginationRange?.map((pageNumber) => {
        if (pageNumber === DOTS) {
          return <li key={uid()}>&#8230;</li>;
        }
        return (
          <PaginationList key={uid()} onClick={() => onPageChange(pageNumber)}>
            <Number pageNumber={pageNumber} currentPage={currentPage}>
              {pageNumber}
            </Number>
          </PaginationList>
        );
      })}

      <li onClick={() => onNext(currentPage)}>
        <FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>
      </li>
    </PaginationContainer>
  );
}
const PaginationContainer = styled.ul`
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin: 3rem auto;
`;
const PaginationList = styled.li`
  color: #000;
`;

const Number = styled.span`
  ${({ pageNumber, currentPage }) => {
    return pageNumber === currentPage
      ? css`
        background-color: var(--color-orange);
        width: 120%;
        height: 100%
        text-align: center;
        border-radius: 10%;
        color: var(--color-white);
        line-height: 1.5rem;
      `
      : "";
  }}
`;
