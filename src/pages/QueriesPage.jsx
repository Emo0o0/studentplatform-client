import React, { useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Alert,
  CircularProgress,
} from "@mui/material";
import {
  Analytics as AnalyticsIcon,
  School as SchoolIcon,
  Person as PersonIcon,
  TrendingUp as TrendingUpIcon,
} from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import AssignmentIcon from "@mui/icons-material/Assignment";

function QueriesPage() {
  const [selectedQuery, setSelectedQuery] = useState("");
  const [faculty, setFaculty] = useState("");
  const [department, setDepartment] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const queries = [
    {
      id: "studentStats",
      title: "Статистика на студентите",
      description:
        "Брой студенти в специалност, прекъснали, възстановени, дипломирани, не се явили на изпит, с поне една двойка",
      filters: ["faculty", "department", "specialty"],
    },
    {
      id: "subjectStats",
      title: "Успех по дисциплини",
      description: "Среден успех по дисциплина, разпределение на оценки",
      filters: ["faculty", "department", "specialty"],
    },
    {
      id: "studentAverages",
      title: "Среден успех на студентите",
      description: "Среден успех на всички студенти",
      filters: ["faculty", "department", "specialty"],
    },
    {
      id: "specialtyAverages",
      title: "Среден успех по специалност",
      description: "Среден успех на специалността общо и по курсове",
      filters: ["specialty"],
    },
  ];

  const faculties = [
    { label: "Машинно-технологичен факултет", value: "MECHANICAL_TECHNOLOGICAL" },
    { label: "Електротехнически факултет", value: "ELECTRICAL" },
    { label: "Корабостроителен факултет", value: "SHIPBUILDING" },
    { label: "Факултет по изчислителна техника и автоматизация", value: "COMPUTER_AUTOMATION" },
    { label: "Добруджански технологичен колеж", value: "DOBRUDJA_COLLEGE" },
    { label: "Колеж в структурата на ТУ-Варна", value: "TU_COLLEGE" },
  ];
  const departments = [
    "Материалознание и технология на материалите",
    "Технология на машиностроенето и металорежещи машини",
    "Растениевъдство",
    "Транспортна Техника и Технологии",
    "Механика и машинни елементи",
    "Индустриален мениджмънт",

    "Корабостроене и Корабни машини и механизми",
    "Корабоводене, управление на транспорта и опазване чистотата на водните пътища",
    "Екология и опазване на околната среда",
    "Индустриален дизайн",
    "Топлотехника",

    "Електроснабдяване и електрообзавеждане",
    "Електротехника и електротехнологии",
    "Електроенергетика",
    "Теоретична и измервателна електротехника",
    "Социални и правни науки",
    "Математика и Физика",

    "Автоматизация на производството",
    "Компютърни науки и технологии",
    "Електронна техника и микроелектроника",
    "Комуникационна техника и технологии",
    "Софтуерни и интернет технологии",
  ];
  const specialties = [
    "АИУКС",
    "ИТС",
    "АТ",
    "А",
    "ВЕИ",
    "ЕЕ",
    "Е",
    "ЕОК",
    "ЕСЕО",
    "ЕТЕТ",
    "ЗНБА",
    "ИИ",
    "ИД",
    "ИМ",
    "ИЕ",
    "ИКТ",
    "КС",
    "КТМ",
    "КСТ",
    "КММ",
    "КВ",
    "КМТ",
    "ЛВТ",
    "МТТ",
    "РМ",
    "СИТ",
    "СМ",
    "СтМ",
    "ТПИ",
    "ТИП",
    "ТТТ",
  ];

  // Mock data for different queries
  const mockData = {
    student_stats: [
      {
        specialty: "КСТ",
        total: 45,
        interrupted: 3,
        reinstated: 2,
        graduated: 12,
        notAttended: 5,
        withFail: 8,
      },
      {
        specialty: "СИТ",
        total: 38,
        interrupted: 2,
        reinstated: 1,
        graduated: 15,
        notAttended: 3,
        withFail: 6,
      },
      {
        specialty: "Киберсигурност",
        total: 52,
        interrupted: 4,
        reinstated: 3,
        graduated: 18,
        notAttended: 7,
        withFail: 12,
      },
    ],
    subject_grades: [
      {
        subject: "ООП",
        averageGrade: 4.67,
        sixes: 8,
        fives: 12,
        fours: 15,
        threes: 10,
        twos: 3,
        notAttended: 2,
        eligible: 45,
        ineligible: 5,
      },
      {
        subject: "Спорт",
        averageGrade: 85.5,
        sixes: 0,
        fives: 0,
        fours: 0,
        threes: 0,
        twos: 0,
        notAttended: 2,
        eligible: 40,
        ineligible: 8,
      },
      {
        subject: "ЛА",
        averageGrade: 4.2,
        sixes: 5,
        fives: 8,
        fours: 12,
        threes: 18,
        twos: 5,
        notAttended: 4,
        eligible: 42,
        ineligible: 6,
      },
      {
        subject: "ФМ",
        averageGrade: 4.8,
        sixes: 12,
        fives: 18,
        fours: 10,
        threes: 8,
        twos: 2,
        notAttended: 1,
        eligible: 49,
        ineligible: 2,
      },
    ],
    student_average: [
      { studentId: 1, averageGrade: 4.5 },
      { studentId: 2, averageGrade: 5.2 },
      { studentId: 3, averageGrade: 3.8 },
      { studentId: 4, averageGrade: 5.8 },
      { studentId: 5, averageGrade: 4.1 },
      { studentId: 6, averageGrade: 5.5 },
      { studentId: 7, averageGrade: 3.2 },
      { studentId: 8, averageGrade: 4.9 },
    ],
    specialty_average: [
      { courseYear: "ОБЩО", averageGrade: 4.57 },
      { courseYear: "I курс", averageGrade: 5.0 },
      { courseYear: "II курс", averageGrade: 4.8 },
      { courseYear: "III курс", averageGrade: 4.2 },
      { courseYear: "IV курс", averageGrade: 4.5 },
    ],
  };

  const handleExecuteQuery = () => {
    setLoading(true);

    // Simulate API call - replace this with your actual API call
    // setTimeout(() => {
    //   setResults(mockData[selectedQuery] || []);
    //   setLoading(false);
    // }, 1000);

    // Example of how to integrate with your backend:
    const fetchData = async () => {
      try {
        const queryParams = new URLSearchParams();
        // Only add parameters that are relevant for the current query
        if (currentQuery.filters.includes("faculty") && faculty) queryParams.append("faculty", faculty);
        if (currentQuery.filters.includes("department") && department) queryParams.append("department", department);
        if (currentQuery.filters.includes("specialty") && specialty) queryParams.append("specialty", specialty);
        const response = await fetch(`http://localhost:8080/query/${selectedQuery}?${queryParams}`, {
          method: "GET",
          headers: {
            // "ngrok-skip-browser-warning": "true",
          },
        });
        const data = await response.json();
        // Extract the actual array from the response based on the query type
        if (data.studentStats && selectedQuery === "studentStats") {
          setResults(data.studentStats);
        } else if (data.subjectStats && selectedQuery === "subjectStats") {
          setResults(data.subjectStats);
        } else if (data.studentAverages && selectedQuery === "studentAverages") {
          setResults(data.studentAverages);
        } else if (data.specialtyAverages && selectedQuery === "specialtyAverages") {
          setResults(data.specialtyAverages);
        } else {
          // If the response structure doesn't match any known pattern, just use the data as is
          setResults(data);
        }
      } catch (error) {
        console.error("Error fetching query results:", error);
        // Handle error appropriately
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  };

  const getGradeCategory = (grade) => {
    if (grade >= 5.5) return { label: "Отличен", color: "success" };
    if (grade >= 4.5) return { label: "Много добър", color: "info" };
    if (grade >= 3.5) return { label: "Добър", color: "warning" };
    if (grade >= 3.0) return { label: "Среден", color: "default" };
    return { label: "Слаб", color: "error" };
  };

  const renderResults = () => {
    if (!results) return null;

    switch (selectedQuery) {
      case "studentStats":
        return (
          <TableContainer component={Paper} sx={{ mt: 3 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: "primary.main" }}>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Специалност</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }} align="right">
                    Общо студенти
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }} align="right">
                    Прекъснали
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }} align="right">
                    Възстановени
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }} align="right">
                    Дипломирани
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }} align="right">
                    Не се явили
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }} align="right">
                    С поне една 2
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {results.map((row, index) => (
                  <TableRow key={index} sx={{ "&:nth-of-type(odd)": { bgcolor: "action.hover" } }}>
                    <TableCell>
                      <Chip label={row.specialty} color="primary" variant="outlined" />
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="h6" color="primary">
                        {row.total}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Chip label={row.interrupted} size="small" color={row.interrupted > 0 ? "warning" : "success"} />
                    </TableCell>
                    <TableCell align="right">
                      <Chip label={row.reinstated} size="small" color="info" />
                    </TableCell>
                    <TableCell align="right">
                      <Chip label={row.graduated} size="small" color="success" />
                    </TableCell>
                    <TableCell align="right">
                      <Chip label={row.notAttended} size="small" color={row.notAttended > 0 ? "error" : "success"} />
                    </TableCell>
                    <TableCell align="right">
                      <Chip label={row.withFail} size="small" color={row.withFail > 0 ? "error" : "success"} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        );

      case "subjectStats":
        return (
          <TableContainer component={Paper} sx={{ mt: 3 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: "primary.main" }}>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Дисциплина</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }} align="right">
                    Среден успех
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }} align="right">
                    6
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }} align="right">
                    5
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }} align="right">
                    4
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }} align="right">
                    3
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }} align="right">
                    2
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }} align="right">
                    Заверени
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }} align="right">
                    Незаверени
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {results.map((row, index) => (
                  <TableRow key={index} sx={{ "&:nth-of-type(odd)": { bgcolor: "action.hover" } }}>
                    <TableCell>
                      <Chip label={row.subject} color="primary" variant="outlined" />
                    </TableCell>
                    <TableCell align="right">
                      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 0.5 }}>
                        <Typography variant="h6" color="primary">
                          {row.averageGrade > 10 ? `${row.averageGrade.toFixed(1)}%` : row.averageGrade.toFixed(2)}
                        </Typography>
                        {row.averageGrade > 10 ? (
                          <Chip label="Зачита се" size="small" color="info" />
                        ) : (
                          <Chip
                            label={getGradeCategory(row.averageGrade).label}
                            size="small"
                            color={getGradeCategory(row.averageGrade).color}
                          />
                        )}
                      </Box>
                    </TableCell>
                    <TableCell align="right">
                      <Chip label={row.sixes} size="small" color="success" variant="outlined" />
                    </TableCell>
                    <TableCell align="right">
                      <Chip label={row.fives} size="small" color="info" variant="outlined" />
                    </TableCell>
                    <TableCell align="right">
                      <Chip label={row.fours} size="small" color="warning" variant="outlined" />
                    </TableCell>
                    <TableCell align="right">
                      <Chip label={row.threes} size="small" color="default" variant="outlined" />
                    </TableCell>
                    <TableCell align="right">
                      <Chip label={row.twos} size="small" color="error" variant="outlined" />
                    </TableCell>
                    <TableCell align="right">
                      <Chip label={row.eligible} size="small" color="success" />
                    </TableCell>
                    <TableCell align="right">
                      <Chip label={row.ineligible} size="small" color="error" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        );

      case "studentAverages":
        return (
          <TableContainer component={Paper} sx={{ mt: 3 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: "primary.main" }}>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Студент</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }} align="right">
                    Среден успех
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }} align="right">
                    Категория
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {results.map((row, index) => (
                  <TableRow key={index} sx={{ "&:nth-of-type(odd)": { bgcolor: "action.hover" } }}>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <PersonIcon color="action" fontSize="small" />
                        <Typography fontWeight="bold">
                          {row.studentName}
                          {row.studentFacultyNumber}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="h6" color="primary">
                        {row.averageGrade.toFixed(2)}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Chip
                        label={getGradeCategory(row.averageGrade).label}
                        color={getGradeCategory(row.averageGrade).color}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        );

      case "specialtyAverages":
        return (
          <TableContainer component={Paper} sx={{ mt: 3 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: "primary.main" }}>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Курс</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }} align="right">
                    Среден успех
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }} align="right">
                    Категория
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {results.map((row, index) => {
                  const isOverall = row.courseYear === "ОБЩО";
                  return (
                    <TableRow
                      key={index}
                      sx={{
                        "&:nth-of-type(odd)": { bgcolor: "action.hover" },
                        ...(isOverall && {
                          bgcolor: "primary.light",
                          "&:hover": { bgcolor: "primary.main" },
                        }),
                      }}
                    >
                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <SchoolIcon color={isOverall ? "primary" : "action"} />
                          <Typography
                            fontWeight={isOverall ? "bold" : "normal"}
                            color={isOverall ? "primary" : "inherit"}
                            variant={isOverall ? "h6" : "body1"}
                          >
                            {row.courseYear}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        <Typography
                          variant={isOverall ? "h5" : "h6"}
                          color={isOverall ? "primary" : "inherit"}
                          fontWeight={isOverall ? "bold" : "normal"}
                        >
                          {row.averageGrade.toFixed(2)}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Chip
                          label={getGradeCategory(row.averageGrade).label}
                          color={getGradeCategory(row.averageGrade).color}
                          variant={isOverall ? "filled" : "outlined"}
                          size={isOverall ? "medium" : "small"}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        );

      default:
        return null;
    }
  };

  const getCurrentQuery = () => queries.find((q) => q.id === selectedQuery);
  const currentQuery = getCurrentQuery();

  // ...existing code...

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h3" sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <AnalyticsIcon fontSize="large" color="primary" />
          Справки и статистики
        </Typography>

        {/* Add this button for admins to review forms */}
        <Button
          component={RouterLink}
          to="/admin/forms"
          variant="contained"
          color="primary"
          startIcon={<AssignmentIcon />}
          sx={{ px: 3, py: 1 }}
        >
          Преглед на формуляри
        </Button>
      </Box>

      <Grid container spacing={3} direction="column">
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom color="primary">
                    Избор на заявка
                  </Typography>

                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Тип заявка</InputLabel>
                    <Select
                      value={selectedQuery}
                      label="Тип заявка"
                      onChange={(e) => {
                        setSelectedQuery(e.target.value);
                        setResults(null); // Clear previous results
                      }}
                    >
                      {queries.map((query) => (
                        <MenuItem key={query.id} value={query.id}>
                          {query.title}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  {currentQuery && (
                    <Alert severity="info" sx={{ mb: 2 }}>
                      {currentQuery.description}
                    </Alert>
                  )}

                  {currentQuery && currentQuery.filters.includes("faculty") && (
                    <FormControl fullWidth sx={{ mb: 2 }}>
                      <InputLabel>Факултет</InputLabel>
                      <Select value={faculty} label="Факултет" onChange={(e) => setFaculty(e.target.value)}>
                        <MenuItem value="">Всички факултети</MenuItem>
                        {faculties.map((f) => (
                          <MenuItem key={f.value} value={f.value}>
                            {f.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}

                  {currentQuery && currentQuery.filters.includes("department") && (
                    <FormControl fullWidth sx={{ mb: 2 }}>
                      <InputLabel>Катедра</InputLabel>
                      <Select value={department} label="Катедра" onChange={(e) => setDepartment(e.target.value)}>
                        <MenuItem value="">Всички катедри</MenuItem>
                        {departments.map((d) => (
                          <MenuItem key={d} value={d}>
                            {d}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}

                  {currentQuery && currentQuery.filters.includes("specialty") && (
                    <FormControl fullWidth sx={{ mb: 2 }}>
                      <InputLabel>Специалност</InputLabel>
                      <Select value={specialty} label="Специалност" onChange={(e) => setSpecialty(e.target.value)}>
                        <MenuItem value="">Всички специалности</MenuItem>
                        {specialties.map((s) => (
                          <MenuItem key={s} value={s}>
                            {s}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}

                  <Button
                    variant="contained"
                    fullWidth
                    onClick={handleExecuteQuery}
                    disabled={!selectedQuery || loading}
                    startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <TrendingUpIcon />}
                    sx={{ mt: 2 }}
                  >
                    {loading ? "Изпълнява се..." : "Изпълни заявка"}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          {results ? (
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom color="primary">
                  Резултати от заявката: {currentQuery?.title}
                </Typography>
                {renderResults()}
              </CardContent>
            </Card>
          ) : (
            <Card sx={{ height: 400, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Box textAlign="center">
                <AnalyticsIcon sx={{ fontSize: 64, color: "grey.400", mb: 2 }} />
                <Typography variant="h6" color="grey.500">
                  Изберете заявка и натиснете "Изпълни заявка" за да видите резултатите
                </Typography>
              </Box>
            </Card>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}

export default QueriesPage;
