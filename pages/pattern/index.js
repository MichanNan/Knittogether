import StyledInput from "../../components/Common/StyledInput";
import Heading from "../../components/Common/Heading";
import Navigation from "../../components/Common/Navigation";

import styled from "styled-components";
import { ImageWrapper, Main } from "../../styles";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Pagination from "../../components/Pattern/Pagination";
import { useEffect } from "react";
import Header from "../../components/Common/Heading";

export default function PatternPage() {
  const pageSize = 20;
  const [patternList, setPatternList] = useState("");
  const [searchContent, setSearchContent] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  async function remoteSearch(searchString, page) {
    const usernameKey = process.env.NEXT_PUBLIC_RAVELRY_USERNAME;
    const passwordKey = process.env.NEXT_PUBLIC_RAVELRY_PASSWORD;

    const base = "https://api.ravelry.com";
    const url = `${base}/patterns/search.json?query=${searchString}&page_size=${pageSize}&page=${page}&sort=best`;

    let headers = new Headers();

    headers.set(
      "Authorization",
      "Basic " + Buffer.from(usernameKey + ":" + passwordKey).toString("base64")
    );
    fetch(url, {
      method: "GET",
      headers: headers,
    })
      .then((response) => response.json())
      .then((json) => setPatternList(json));
  }
  useEffect(() => {
    remoteSearch(searchContent, currentPage);
  }, [currentPage]);
  function handleSubmit(event) {
    event.preventDefault();
    remoteSearch(searchContent, currentPage);
  }

  return (
    <Main>
      <Header>Pattern</Header>
      <PatternSearchForm onSubmit={(event) => handleSubmit(event)}>
        <label htmlFor="pattern"></label>
        <StyledInput
          name="pattern"
          width="18rem"
          height="2rem"
          radius="0.5rem"
          backgroundColor="var(--color-grey)"
          placeholder="search from ravelry"
          onChange={(event) => setSearchContent(event.target.value)}
        />
        <Button width="0" height="0">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </Button>
      </PatternSearchForm>
      <PatternContainer>
        {patternList ? (
          <>
            {patternList.patterns.map((pattern) => (
              <PatternItem key={pattern.id}>
                <Link
                  href={`https://www.ravelry.com/patterns/library/${pattern.permalink}`}
                >
                  <ImageWrapper radius="1.2rem">
                    <Image
                      src={
                        pattern.first_photo
                          ? pattern.first_photo.medium2_url
                          : "/pattern.jpg"
                      }
                      alt={pattern.name}
                      width={150}
                      height={150}
                    />
                  </ImageWrapper>
                </Link>
                <p>{pattern.name}</p>
              </PatternItem>
            ))}
          </>
        ) : (
          ""
        )}
      </PatternContainer>
      {patternList && (
        <Pagination
          currentPage={currentPage}
          totalCount={patternList.paginator.results}
          pageSize={pageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}

      <Navigation />
    </Main>
  );
}

const PatternSearchForm = styled.form`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 4rem;
  padding: 0 1rem;
  background-color: var(--color-grey);
  border-radius: 1rem;
  height: 2.5rem;
  margin: 0 auto;
`;
const Button = styled.button`
  border: none;
  font-size: 1rem;
`;
const PatternContainer = styled.section`
  margin-top: 5rem;
  display: grid;
  grid-template-columns: 180px 180px;
  grid-row-gap: 1rem;
  justify-content: center;
  justify-items: center;
`;
const PatternItem = styled.div`
  font-size: 0.8rem;
`;
