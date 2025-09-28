import React, { useEffect, useState } from "react";
import { Container, Typography, Box, Grid, Button } from "@mui/material";
import ScrollAnimation from "react-animate-on-scroll";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { apiRouterCall } from "@/api-services/service";

export default function AboutUs() {
  const router = useRouter();
  const { t, i18n } = useTranslation();

  const [aboutImage, setAboutImage] = useState("/images/About/aboutlanding.webp"); // fallback
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAboutImage = async () => {
      try {
        const res = await apiRouterCall({
          endPoint: "getStaticContentByType",
          paramsData: { contentType: "about" },
        });

        if (res?.data?.responseCode === 200) {
          const content = res.data.result?.docs?.[0];
          if (content?.imageUrl) {
            setAboutImage(content.imageUrl);
          }
        }
      } catch (error) {
        console.error("Failed to fetch about image:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutImage();
  }, []);

  return (
    <Box className="landing-about">
      <Box align="center" className="subSection">
        <ScrollAnimation animateIn="zoomIn">
          <Typography variant="h2" style={{ textTransform: "uppercase" }}>
            {t("about_aved_properties")}
          </Typography>
        </ScrollAnimation>
      </Box>

      <Container>
        <Box>
          {/* Show loader shimmer OR just show the image directly */}
          <img
            src={aboutImage}
            alt="About Aved Properties"
            style={{
              width: "100%",
              borderRadius: "10px",
              objectFit: "cover",
            }}
          />
        </Box>

        <Grid container spacing={2} alignItems="center" position="relative">
          <Grid item xs={12} md={5} sm={12}>
            <Box mt={2} mb={2} className="aboutusbanner">
              <ScrollAnimation animateIn="slideInUp">
                <Typography variant="h4" style={{ textTransform: "uppercase" }}>
                  {t("aved_description")}
                </Typography>
              </ScrollAnimation>

              <Typography
                variant="body2"
                color="#9D9D9C"
                style={{ textTransform: "uppercase" }}
              >
                {t("aved_markets")}
              </Typography>

              <Box mt={4}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => router.push("/about-us")}
                >
                  {t("learn_more")}
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
