import React, { useContext, useEffect, useState } from "react";
import { Container, Typography, Box } from "@mui/material";
import styled from "@emotion/styled";
import AppContext from "@/context/AppContext";
import HomeLayout from "@/layout/HomeLayout";
import { apiRouterCall } from "@/api-services/service";
import { useTranslation } from "react-i18next";

const TermsComponent = styled("Box")(() => ({
  "& .privacyMainBox": {
    "& h6": {
      lineHeight: "20px",
    },
  },
  "& h6": {
    lineHeight: "30px",
  },
}));

export default function TermsCondition() {
  const auth = useContext(AppContext);
  const { i18n, t } = useTranslation(); // detect language
  const [termsData, setTermsData] = useState(null);

  useEffect(() => {
    // set heading based on lang
    auth?.setTopHeading(
      i18n.dir() === "rtl" ? "الشروط والأحكام" : "Terms & Conditions"
    );

    const fetchTerms = async () => {
      const res = await apiRouterCall({
        endPoint: "getStaticContentByType",
        paramsData: { contentType: "termsCondition" },
      });

      if (res?.data?.responseCode === 200) {
        setTermsData(res.data.result?.docs[0]);
      }
    };

    fetchTerms();
  }, [i18n.language]); // run when lang changes

  // Choose language data
  const isRTL = i18n.dir() === "rtl";
  const title = isRTL ? termsData?.title_ar : termsData?.title;
  const description = isRTL
    ? termsData?.description_ar
    : termsData?.description;

  return (
    <TermsComponent>
      <Box mb={3} className="termBoxmain">
        <Container>
          <Typography
            variant="h3"
            color="#fff"
            dir={isRTL ? "rtl" : "ltr"}
          >
            {title}
          </Typography>
        </Container>
      </Box>

      <Container style={{ marginBottom: "50px" }}>
        <Typography
          variant="h6"
          color="primary"
          dir={isRTL ? "rtl" : "ltr"}
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </Container>
    </TermsComponent>
  );
}

TermsCondition.getLayout = function getLayout(page) {
  return <HomeLayout>{page}</HomeLayout>;
};
