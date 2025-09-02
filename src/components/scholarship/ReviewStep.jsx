import React from "react";
import { Typography, Grid, Paper, Box, Divider } from "@mui/material";
import {
  getBankName,
  getDirectionName,
  getSubjectName,
  getDegreeLevelName,
  getCourseYearName,
  getSemesterName,
  getFamilyStatusName,
  getScholarshipName,
  getSocialTypeName,
  getCountryName,
  getFacultyName,
} from "../../constants/dropdownOptions";

export default function ReviewStep({ formData }) {
  const renderPersonalInfo = () => (
    <Box>
      <Typography variant="subtitle1" color="primary" gutterBottom>
        Лична информация
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Typography variant="body2" color="text.secondary">
            Име
          </Typography>
          <Typography>{formData.personalInfo?.firstName}</Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="body2" color="text.secondary">
            Презиме
          </Typography>
          <Typography>{formData.personalInfo?.middleName}</Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="body2" color="text.secondary">
            Фамилия
          </Typography>
          <Typography>{formData.personalInfo?.lastName}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body2" color="text.secondary">
            ЕГН
          </Typography>
          <Typography>{formData.personalInfo?.egn}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body2" color="text.secondary">
            Email
          </Typography>
          <Typography>{formData.personalInfo?.email}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2" color="text.secondary">
            Адрес
          </Typography>
          <Typography>
            {`${formData.personalInfo?.city}, ул. ${formData.personalInfo?.street} ${formData.personalInfo?.streetNumber}`}
            {formData.personalInfo?.entrance && `, вх. ${formData.personalInfo?.entrance}`}
            {formData.personalInfo?.floor && `, ет. ${formData.personalInfo?.floor}`}
            {formData.personalInfo?.apartment && `, ап. ${formData.personalInfo?.apartment}`}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );

  const renderAcademicInfo = () => (
    <Box sx={{ mt: 3 }}>
      <Typography variant="subtitle1" color="primary" gutterBottom>
        Академична информация
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="body2" color="text.secondary">
            Факултетен номер
          </Typography>
          <Typography>{formData.academicInfo?.facultyNumber}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body2" color="text.secondary">
            Факултет
          </Typography>
          <Typography>{getFacultyName(formData.academicInfo?.faculty)}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body2" color="text.secondary">
            Специалност
          </Typography>
          <Typography>{formData.academicInfo?.specialty}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body2" color="text.secondary">
            Образователна степен
          </Typography>
          <Typography>{getDegreeLevelName(formData.academicInfo?.degreeLevel)}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body2" color="text.secondary">
            Курс
          </Typography>
          <Typography>{getCourseYearName(formData.academicInfo?.courseYear)}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body2" color="text.secondary">
            Семестър
          </Typography>
          <Typography>{getSemesterName(formData.academicInfo?.semester)}</Typography>
        </Grid>
      </Grid>
    </Box>
  );

  const renderBankInfo = () => (
    <Box sx={{ mt: 3 }}>
      <Typography variant="subtitle1" color="primary" gutterBottom>
        Банкова информация
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="body2" color="text.secondary">
            IBAN
          </Typography>
          <Typography>{formData.bankInfo?.iban || "—"}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body2" color="text.secondary">
            Банка
          </Typography>
          <Typography>{getBankName(formData.bankInfo?.bankName)}</Typography>
        </Grid>
      </Grid>
    </Box>
  );

  const renderScholarshipSpecificInfo = () => {
    if (!formData.specificInfo) return null;

    switch (formData.scholarshipType) {
      case "MERIT_SUCCESS":
        return (
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle1" color="primary" gutterBottom>
              Успех
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Среден успех
            </Typography>
            <Typography>{formData.specificInfo?.previousGPA ?? formData.previousGPA ?? "—"}</Typography>
          </Box>
        );

      case "MERIT_WITH_INCOME":
        return (
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle1" color="primary" gutterBottom>
              Семейно положение
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="body2" color="text.secondary">
                  Семейно положение
                </Typography>
                <Typography>{formData.specificInfo.familyStatus === "MARRIED" ? "Семеен/а" : "Несемеен/а"}</Typography>
              </Grid>

              {formData.specificInfo.familyStatus === "MARRIED" ? (
                <>
                  <Grid item xs={12}>
                    <Typography variant="body2" color="text.secondary">
                      Съпруг/а
                    </Typography>
                    <Typography>
                      {formData.specificInfo.spouseName} - {formData.specificInfo.spouseEmploymentStatus}
                    </Typography>
                  </Grid>
                  {formData.specificInfo?.familyStatus === "MARRIED" && (
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">
                        Деца
                      </Typography>
                      <Typography>
                        {Array.isArray(formData.incomeInfo?.children) && formData.incomeInfo.children.length > 0
                          ? `${formData.incomeInfo.children.length} ${
                              formData.incomeInfo.children.length === 1 ? "дете" : "деца"
                            }`
                          : "Няма деца"}
                      </Typography>
                    </Grid>
                  )}
                </>
              ) : (
                <>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">
                      Баща
                    </Typography>
                    <Typography>{formData.incomeInfo.fatherName}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">
                      Майка
                    </Typography>
                    <Typography>{formData.incomeInfo.motherName}</Typography>
                  </Grid>
                  {formData.specificInfo?.familyStatus === "SINGLE" && (
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">
                        Братя/Сестри
                      </Typography>
                      <Typography>
                        {Array.isArray(formData.incomeInfo?.siblings) && formData.incomeInfo.siblings.length > 0
                          ? `${formData.incomeInfo.siblings.length} ${
                              formData.incomeInfo.siblings.length === 1 ? "брат/сестра" : "братя/сестри"
                            }`
                          : "Няма братя/сестри"}
                      </Typography>
                    </Grid>
                  )}
                </>
              )}
            </Grid>
          </Box>
        );

      case "SPECIAL_ACHIEVEMENTS":
        return (
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle1" color="primary" gutterBottom>
              Специални постижения
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="body2" color="text.secondary">
                  Описание на постижението
                </Typography>
                <Typography sx={{ whiteSpace: "pre-wrap" }}>
                  {formData.specificInfo?.achievementTopic || "—"}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        );

      case "FOREIGN_STUDENT":
        return (
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle1" color="primary" gutterBottom>
              Информация за чуждестранен студент
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="body2" color="text.secondary">
                  Държава на произход
                </Typography>
                <Typography>{getCountryName(formData.specificInfo.countryOfOrigin) || "—"}</Typography>
              </Grid>
            </Grid>
          </Box>
        );

      case "FIRST_YEAR":
        return (
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle1" color="primary" gutterBottom>
              Информация за първокурсник
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="body2" color="text.secondary">
                  Професионално направление
                </Typography>
                <Typography>{getDirectionName(formData.specificInfo?.professionalDirection)}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">
                  Оценка БЕЛ
                </Typography>
                <Typography>{formData.specificInfo?.bulgarianLanguageGrade || "—"}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">
                  Втори предмет
                </Typography>
                <Typography>
                  {getSubjectName(formData.specificInfo?.secondSubject)}
                  {formData.specificInfo?.secondSubjectGrade ? ` - ${formData.specificInfo.secondSubjectGrade}` : ""}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
        Преглед на данните
      </Typography>
      {renderPersonalInfo()}
      <Divider sx={{ my: 3 }} />
      {renderAcademicInfo()}
      <Divider sx={{ my: 3 }} />
      {renderScholarshipSpecificInfo()}
      <Divider sx={{ my: 3 }} />
      {renderBankInfo()}
    </Paper>
  );
}
