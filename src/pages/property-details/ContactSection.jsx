// src/pages/property-details/ContactSection.jsx
import React, { useContext, useState } from "react";
import { Box, Typography, Grid, TextField, Button, Paper, FormHelperText, MenuItem, Select, FormControl } from "@mui/material";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n";
import { Form, Formik } from "formik";
import * as yup from "yup";
import AppContext from "@/context/AppContext";
import { postAPIHandler } from "@/api-services/service";
import toast from "react-hot-toast";
import ButtonCircularProgress from "@/components/ButtonCircularProgress";

const ContactSection = ({ propertyData }) => {
  const auth = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  const propertyName = i18n.language === "en" 
    ? propertyData?.property_name 
    : propertyData?.property_name_ar || propertyData?.property_name;

  const initialValues = {
    name: auth?.userData?.name ? auth?.userData?.name : "",
    email: auth?.userData?.email ? auth?.userData?.email : "",
    phone: "",
    propertyType: "",
    unitNumber: "",
    floorNumber: "",
    message: "",
  };

  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .required(t("contactSection.nameRequired"))
      .max(30, t("contactSection.nameMax"))
      .matches(
        /^[a-zA-Z\u0600-\u06FF]+(([',. -][a-zA-Z\u0600-\u06FF])?[a-zA-Z\u0600-\u06FF]*)*$/g,
        t("contactSection.nameInvalid")
      ),

    email: yup
      .string()
      .max(100, t("contactSection.emailMax"))
      .email(t("contactSection.emailInvalid"))
      .required(t("contactSection.emailRequired")),

    phone: yup
      .string()
      .required(t("contactSection.phoneRequired"))
      .matches(/^[0-9+\s()-]+$/, t("contactSection.phoneInvalid"))
      .min(10, t("contactSection.phoneMin")),

    propertyType: yup.string(),
    unitNumber: yup.string(),
    floorNumber: yup.string(),

    message: yup
      .string()
      .required(t("contactSection.messageRequired"))
      .min(3, t("contactSection.messageMin"))
      .max(600, t("contactSection.messageMax")),
  });

  const handleSubmitContact = async (values, { resetForm }) => {
    try {
      setIsLoading(true);
      const dataToSend = {
        name: values.name,
        email: values.email.toLocaleLowerCase(),
        phone: values.phone,
        message: values.message,
        propertyId: propertyData?._id,
        propertyName: propertyName,
      };

      if (values.propertyType) {
        dataToSend.propertyType = values.propertyType;
      }
      if (values.unitNumber) {
        dataToSend.unitNumber = values.unitNumber;
      }
      if (values.floorNumber) {
        dataToSend.floorNumber = values.floorNumber;
      }

      const response = await postAPIHandler({
        endPoint: "addContactUs",
        dataToSend: dataToSend,
      });

      if (response?.data?.responseCode === 200) {
        toast.success(response?.data?.responseMessage);
        resetForm();
      } else {
        toast.error(response?.data?.responseMessage);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <Box mt={6}>
      <Paper 
        elevation={3} 
        sx={{ 
          padding: 4, 
          borderRadius: 3, 
          background: "linear-gradient(135deg, #f5f7fa 0%, #ffffff 50%, #e8eaf0 100%)" 
        }}
      >
        <Box textAlign="center" mb={4}>
          <Typography variant="h3" fontWeight={600} color="text.primary" mb={2}>
            {t("contactSection.reserveUnit")} {propertyName}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {t("contactSection.enterDetails")}
          </Typography>
        </Box>

        <Box sx={{ background: "white", padding: 4, borderRadius: 2, boxShadow: 1 }}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmitContact}
          >
            {({ errors, handleBlur, handleChange, touched, values }) => (
              <Form>
                <Grid container spacing={3}>
                  {/* Name */}
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary" mb={1}>
                      {t("contactSection.name")} *
                    </Typography>
                    <TextField
                      fullWidth
                      variant="outlined"
                      placeholder={t("contactSection.namePlaceholder")}
                      type="text"
                      name="name"
                      value={values.name}
                      error={Boolean(touched.name && errors.name)}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      autoComplete="off"
                      disabled={isLoading}
                    />
                    <FormHelperText error>
                      {touched.name && errors.name}
                    </FormHelperText>
                  </Grid>

                  {/* Email */}
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary" mb={1}>
                      {t("contactSection.email")} *
                    </Typography>
                    <TextField
                      fullWidth
                      variant="outlined"
                      placeholder={t("contactSection.emailPlaceholder")}
                      type="email"
                      name="email"
                      value={values.email}
                      error={Boolean(touched.email && errors.email)}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      autoComplete="off"
                      disabled={isLoading}
                    />
                    <FormHelperText error>
                      {touched.email && errors.email}
                    </FormHelperText>
                  </Grid>

                  {/* Phone */}
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary" mb={1}>
                      {t("contactSection.phone")} *
                    </Typography>
                    <TextField
                      fullWidth
                      variant="outlined"
                      placeholder={t("contactSection.phonePlaceholder")}
                      type="tel"
                      name="phone"
                      value={values.phone}
                      error={Boolean(touched.phone && errors.phone)}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      autoComplete="off"
                      disabled={isLoading}
                    />
                    <FormHelperText error>
                      {touched.phone && errors.phone}
                    </FormHelperText>
                  </Grid>

                 {/* Property Type */}
<Grid item xs={12} sm={6}>
  <Typography variant="body2" color="text.secondary" mb={1}>
    {t("contactSection.propertyType")} ({t("contactSection.optional")})
  </Typography>
  <FormControl fullWidth variant="outlined">
    <Select
      name="propertyType"
      value={values.propertyType}
      onChange={handleChange}
      onBlur={handleBlur}
      disabled={isLoading}
      displayEmpty
      sx={{
        textAlign: i18n.language === "ar" ? "right" : "left",
        direction: i18n.language === "ar" ? "rtl" : "ltr",
        "& .MuiSelect-select": {
          textAlign: i18n.language === "ar" ? "right !important" : "left",
          paddingRight: i18n.language === "ar" ? "32px" : "14px",
          paddingLeft: i18n.language === "ar" ? "14px" : "32px",
        },
        "& .MuiSelect-icon": {
          right: i18n.language === "ar" ? "auto" : "7px",
          left: i18n.language === "ar" ? "7px" : "auto",
        }
      }}
      MenuProps={{
        PaperProps: {
          sx: {
            "& .MuiMenuItem-root": {
              justifyContent: i18n.language === "ar" ? "flex-end" : "flex-start",
              textAlign: i18n.language === "ar" ? "right" : "left",
              direction: i18n.language === "ar" ? "rtl" : "ltr",
            }
          }
        }
      }}
    >
      <MenuItem value="">
        <em>{t("contactSection.selectType")}</em>
      </MenuItem>
      <MenuItem value="villa">{t("contactSection.villa")}</MenuItem>
      <MenuItem value="tower">{t("contactSection.tower")}</MenuItem>
    </Select>
  </FormControl>
</Grid>

                  {/* Unit Number - Only for Tower */}
                  {values.propertyType === "tower" && (
                    <>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="text.secondary" mb={1}>
                          {t("contactSection.unitNumber")} ({t("contactSection.optional")})
                        </Typography>
                        <TextField
                          fullWidth
                          variant="outlined"
                          placeholder={t("contactSection.unitPlaceholder")}
                          type="text"
                          name="unitNumber"
                          value={values.unitNumber}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          autoComplete="off"
                          disabled={isLoading}
                        />
                      </Grid>

                      {/* Floor Number - Only for Tower */}
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="text.secondary" mb={1}>
                          {t("contactSection.floorNumber")} ({t("contactSection.optional")})
                        </Typography>
                        <TextField
                          fullWidth
                          variant="outlined"
                          placeholder={t("contactSection.floorPlaceholder")}
                          type="text"
                          name="floorNumber"
                          value={values.floorNumber}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          autoComplete="off"
                          disabled={isLoading}
                        />
                      </Grid>
                    </>
                  )}

                  {/* Message */}
                  <Grid item xs={12}>
                    <Typography variant="body2" color="text.secondary" mb={1}>
                      {t("contactSection.message")} *
                    </Typography>
                    <TextField
                      fullWidth
                      variant="outlined"
                      placeholder={t("contactSection.messagePlaceholder")}
                      type="text"
                      name="message"
                      value={values.message}
                      error={Boolean(touched.message && errors.message)}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      autoComplete="off"
                      multiline
                      rows="4"
                      disabled={isLoading}
                    />
                    <FormHelperText error>
                      {touched.message && errors.message}
                    </FormHelperText>
                  </Grid>

                  {/* Submit Button */}
                  <Grid item xs={12}>
                    <Box textAlign="center">
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        size="large"
                        disabled={isLoading}
                        sx={{ 
                          minWidth: "200px", 
                          padding: "12px 40px",
                          background: "linear-gradient(135deg, #bac0deff 0%, #b2aeb5ff 100%)",
                          "&:hover": {
                            background: "linear-gradient(135deg, #bac0deff 0%, #b2aeb5ff 100%)"
                          }
                        }}
                      >
                        {t("contactSection.sendMessage")} 
                        {isLoading && <ButtonCircularProgress />}
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Box>
      </Paper>
    </Box>
  );
};

export default ContactSection;