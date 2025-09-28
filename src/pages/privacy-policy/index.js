import React, { useContext, useEffect, useState } from "react";
import { Container, Typography, Box } from "@mui/material";
import styled from "@emotion/styled";
import AppContext from "@/context/AppContext";
import HomeLayout from "@/layout/HomeLayout";
import { apiRouterCall } from "@/api-services/service";
import { useTranslation } from "react-i18next";

const PrivacyComponent = styled("Box")(() => ({
  "& .privacyMainBox": {},
  "& h6": {
    lineHeight: "30px",
  },
}));

export default function PrivacyPolicy() {
  const auth = useContext(AppContext);
  const { i18n } = useTranslation(); // 👈 detect current language
  const [termsData, setTermsData] = useState(null);

  useEffect(() => {
    auth?.setTopHeading("Terms & Conditions");

    const fetchTerms = async () => {
      const res = await apiRouterCall({
        endPoint: "getStaticContentByType",
        paramsData: { contentType: "privacyPolicy" },
      });

      if (res?.data?.responseCode === 200) {
        setTermsData(res.data.result?.docs[0]);
      }
    };

    fetchTerms();
  }, []);

  // Decide language content
  const isRTL = i18n.dir() === "rtl"; // true if Arabic
  const title = isRTL ? termsData?.title_ar : termsData?.title;
  const description = isRTL
    ? termsData?.description_ar
    : termsData?.description;

  return (
    <PrivacyComponent>
      <Box mb={3} className="termBoxmain">
        <Container>
          <Typography variant="h3" color="#fff" dir={isRTL ? "rtl" : "ltr"}>
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
    </PrivacyComponent>
  );
}

PrivacyPolicy.getLayout = function getLayout(page) {
  return <HomeLayout>{page}</HomeLayout>;
};
