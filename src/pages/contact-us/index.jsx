import HomeLayout from "@/layout/HomeLayout";
import {
  Box,
  Container,
  Typography,
  Divider,
  styled,
  Button,
  Grid,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import ContactUs from "../home/ContactUs";
import { HiOutlineMailOpen } from "react-icons/hi";
import { MdOutlinePhoneCallback } from "react-icons/md";
import { MdOutlineNotListedLocation } from "react-icons/md";
import { useTranslation } from "react-i18next";

const ContactUSBox = styled("Box")(({ theme }) => ({
  "& .contctBannerImage": {
    position: "relative",
    zIndex: 1,
    backgroundSize: "cover",
    backgroundImage: "url(/images/contact/contact_bg2.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "top right",
    overflow: "hidden",
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: 2,
    },
    "& > *": {
      position: "relative",
      zIndex: 3,
    },
  },
  "& .headingBox": {
    paddingTop: "150px",
    [theme.breakpoints.down("sm")]: {
      paddingTop: "113px",
    },
  },
  "& .TopSection": {
    background: "#fff",
    color: "#000",
    boxShadow:
      "rgba(0, 0, 0, 0.15) 0px 5px 15px, rgba(0, 0, 0, 0.15) 0px -5px 15px, rgba(0, 0, 0, 0.15) -5px 0px 15px, rgba(0, 0, 0, 0.15) 5px 0px 15px",
  },
  "& .gettouchBox": {
    border: "1px solid #80808059",
    padding: "30px",
    borderRadius: "5px",
    "& svg": {
      fontSize: "25px",
    },
    "& h2": {
      fontSize: "30px",
      marginTop: "20px",
      lineHeight: "30px",
    },
    "& button": {
      marginTop: "25px",
      width: "100%",
    },
  },
}));

export default function Contactus() {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <>
      <ContactUSBox>
        <Box className="contctBannerImage">
          <Container style={{ position: "relative", zIndex: "999" }}>
            <Box className="headingBox">
              <Typography variant="h1" color="#fff">
                {t("getInTouch")}
              </Typography>
            </Box>

            <Box
              className=" displaySpacebetween"
              style={{ alignItems: "end", flexWrap: "wrap" }}
              pb={5}
            >
              <Box className="displayStart" gap="15px">
                <Typography
                  variant="h6"
                  color="#FFFFFF99"
                  sx={{ cursor: "pointer", fontWeight: "600" }}
                  onClick={() => router.push("/")}
                >
                  {t("home")}
                </Typography>

                <Typography
                  variant="h6"
                  color="#FFFFFF99"
                  sx={{ cursor: "pointer", fontWeight: "600" }}
                // onClick={() => router.push("/blog")}
                >
                  {t("getInTouch")}
                </Typography>
              </Box>


            </Box>
          </Container>
        </Box>

        <Container className="main-sectionGap contactsection">
          <Grid container spacing={3}>
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <Box className="gettouchBox">
                <HiOutlineMailOpen />
                <Typography variant="h2">{t("supportEmail")}</Typography>
                <Typography variant="body2">info@aved-sa.com</Typography>

                <Button variant="contained" color="secondary">
                  {t("emailUs")}
                </Button>
              </Box>
            </Grid>
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <Box className="gettouchBox">
                <MdOutlinePhoneCallback />
                <Typography variant="h2">{t("phoneNumber")}</Typography>
                <Box display="flex" alignItems="center">
                  <Typography variant="body2">+966 56 658 9443</Typography>
                  <Divider orientation="vertical" flexItem sx={{ mx: 5 }} />
                  <Typography variant="body2">+966 53 111 3537</Typography>
                </Box>

                <Button variant="contained" color="secondary">
                  {t("callUs")}
                </Button>
              </Box>
            </Grid>
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <Box className="gettouchBox">
                <MdOutlineNotListedLocation />
                <Typography variant="h2">{t("location")}</Typography>
                <Typography variant="body2">
                  Jeddah | Prince Sultan Rd, AVED Building
                </Typography>

                <Button variant="contained" color="secondary">
                  {t("visitUs")}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>

        <ContactUs />

        <Box className="main-sectionGap">
          <Box
            sx={{
              position: "relative",
              overflow: "hidden",
              width: "100%",
              zIndex: "999",
              paddingTop: "30.25%",
              borderRadius: 2,
              boxShadow: 2,
            }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.3547402157264!2d39.14763017536035!3d21.57916198020664!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15c3db97ce1d5c5b%3A0xd4313d7780e49e75!2sAVED%20Company!5e0!3m2!1sar!2ssa!4v1726920000000!5m2!1sar!2ssa"
              width="100%"
              height="100%"
              style={{
                border: 0,
                position: "absolute",
                top: 0,
                left: 0,
              }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </Box>
        </Box>
      </ContactUSBox>
    </>
  );
}

Contactus.getLayout = function getLayout(page) {
  return <HomeLayout>{page}</HomeLayout>;
};