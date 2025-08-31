import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
  Alert,
  Divider,
  Card,
  CardContent,
  Collapse,
  Tooltip,
  Tabs,
  Tab,
} from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  Search as SearchIcon,
  CheckCircle as ApproveIcon,
  Cancel as RejectIcon,
  Visibility as ViewIcon,
  FilterList as FilterIcon,
  Close as CloseIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import {
  fetchAdminInsuranceApplyForms,
  fetchAdminInsuranceLateForms,
  fetchAdminInsuranceTerminateForms,
  updateInsuranceFormStatus,
} from "../services/adminFormsService";

function AdminInsuranceForms() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [forms, setForms] = useState({
    apply: [],
    late: [],
    terminate: [],
  });
  const [filteredForms, setFilteredForms] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [expandedForm, setExpandedForm] = useState(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    specialty: "",
    formType: "",
    status: "",
    searchTerm: "",
  });
  const [tabValue, setTabValue] = useState(0);

  // Approval dialog states
  const [approvalDialog, setApprovalDialog] = useState({
    open: false,
    formId: null,
    formType: null, // 'apply', 'late', or 'terminate'
    action: null, // 'approve' or 'reject'
    studentName: "",
  });

  // Approval processing state
  const [processingApproval, setProcessingApproval] = useState(false);

  useEffect(() => {
    const getInsuranceForms = async () => {
      try {
        setLoading(true);

        // Fetch all three types of forms separately
        const [applyData, lateData, terminateData] = await Promise.all([
          fetchAdminInsuranceApplyForms(filters.specialty),
          fetchAdminInsuranceLateForms(filters.specialty),
          fetchAdminInsuranceTerminateForms(filters.specialty),
        ]);

        // Organize forms by type
        const formsByType = {
          apply: applyData.forms || [],
          late: lateData.forms || [],
          terminate: terminateData.forms || [],
        };

        setForms(formsByType);

        // Initialize filtered forms with all forms
        const allForms = [
          ...formsByType.apply.map((form) => ({ ...form, formType: "apply" })),
          ...formsByType.late.map((form) => ({ ...form, formType: "late" })),
          ...formsByType.terminate.map((form) => ({ ...form, formType: "terminate" })),
        ];

        setFilteredForms(allForms);
      } catch (err) {
        console.error("Error fetching insurance forms:", err);
        setError("Възникна грешка при зареждането на формулярите. Моля, опитайте отново.");
      } finally {
        setLoading(false);
      }
    };

    getInsuranceForms();
  }, [filters.specialty]);

  // Rest of the component remains the same...
  useEffect(() => {
    applyFilters();
  }, [filters, forms, tabValue]);

  // Format date string to a more readable format
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat("bg-BG", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(date);
    } catch (e) {
      return dateString;
    }
  };

  const applyFilters = () => {
    // Start with all forms
    let allForms = [
      ...forms.apply.map((form) => ({ ...form, formType: "apply" })),
      ...forms.late.map((form) => ({ ...form, formType: "late" })),
      ...forms.terminate.map((form) => ({ ...form, formType: "terminate" })),
    ];

    // Filter by form type based on tab
    if (tabValue === 1) {
      allForms = allForms.filter((form) => form.formType === "apply");
    } else if (tabValue === 2) {
      allForms = allForms.filter((form) => form.formType === "late");
    } else if (tabValue === 3) {
      allForms = allForms.filter((form) => form.formType === "terminate");
    }

    // Filter by status
    if (filters.status) {
      allForms = allForms.filter((form) => form.formStatus === filters.status);
    }

    // Filter by form type (from dropdown)
    if (filters.formType && tabValue === 0) {
      allForms = allForms.filter((form) => form.formType === filters.formType);
    }

    // Filter by search term
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      allForms = allForms.filter(
        (form) =>
          form.studentFirstName.toLowerCase().includes(searchLower) ||
          form.studentLastName.toLowerCase().includes(searchLower) ||
          form.studentFacultyNumber.toLowerCase().includes(searchLower)
      );
    }

    setFilteredForms(allForms);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const resetFilters = () => {
    setFilters({
      specialty: "",
      formType: "",
      status: "",
      searchTerm: "",
    });
    setFilterOpen(false);
  };

  const toggleExpandForm = (formId) => {
    setExpandedForm(expandedForm === formId ? null : formId);
  };

  const handleApproveClick = (formId, formType, studentName) => {
    setApprovalDialog({
      open: true,
      formId,
      formType,
      action: "approve",
      studentName,
    });
  };

  const handleRejectClick = (formId, formType, studentName) => {
    setApprovalDialog({
      open: true,
      formId,
      formType,
      action: "reject",
      studentName,
    });
  };

  const handleDialogClose = () => {
    setApprovalDialog({
      open: false,
      formId: null,
      formType: null,
      action: null,
      studentName: "",
    });
  };

  const handleConfirmAction = async () => {
    try {
      setProcessingApproval(true);
      const { formId, formType, action } = approvalDialog;
      const newStatus = action === "approve" ? "APPROVED" : "DENIED";

      await updateInsuranceFormStatus(formId, formType, newStatus);

      // Update local state
      const updatedForms = { ...forms };
      if (formType === "apply") {
        updatedForms.apply = updatedForms.apply.map((form) =>
          form.formId === formId ? { ...form, formStatus: newStatus } : form
        );
      } else if (formType === "late") {
        updatedForms.late = updatedForms.late.map((form) =>
          form.formId === formId ? { ...form, formStatus: newStatus } : form
        );
      } else if (formType === "terminate") {
        updatedForms.terminate = updatedForms.terminate.map((form) =>
          form.formId === formId ? { ...form, formStatus: newStatus } : form
        );
      }

      setForms(updatedForms);
      handleDialogClose();
    } catch (error) {
      console.error("Error updating form status:", error);
      setError(
        `Възникна грешка при ${approvalDialog.action === "approve" ? "одобрението" : "отхвърлянето"} на формуляра.`
      );
    } finally {
      setProcessingApproval(false);
    }
  };

  // Function to get form type name in Bulgarian
  const getFormTypeName = (type) => {
    const types = {
      apply: "Текущ период",
      late: "Минал период",
      terminate: "Прекратяване",
    };
    return types[type] || type;
  };

  // Get insurer name
  const getInsurerName = (insurer) => {
    const insurers = {
      TU: "Технически университет",
      NHIF: "НЗОК",
      OTHER: "Друг",
    };
    return insurers[insurer] || insurer;
  };

  // Function to render status chip
  const renderStatusChip = (status) => {
    let color = "default";

    switch (status) {
      case "SENT":
        color = "primary";
        break;
      case "SEEN":
        color = "info";
        break;
      case "APPROVED":
        color = "success";
        break;
      case "DENIED":
        color = "error";
        break;
      case "RETURNED":
        color = "warning";
        break;
      default:
        color = "default";
    }

    const statusLabels = {
      SENT: "Изпратено",
      SEEN: "Прегледано",
      APPROVED: "Одобрено",
      DENIED: "Отказано",
      RETURNED: "Върнато",
    };

    return <Chip label={statusLabels[status] || status} color={color} size="small" />;
  };

  // Render apply form details
  const renderApplyFormDetails = (form) => (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <Typography variant="subtitle2" color="text.secondary">
          Получава доходи от трудова дейност
        </Typography>
        <Typography variant="body1">{form.isReceivingWorkRelatedIncome ? "Да" : "Не"}</Typography>
      </Grid>
      <Grid item xs={12} md={4}>
        <Typography variant="subtitle2" color="text.secondary">
          Получава пенсия
        </Typography>
        <Typography variant="body1">{form.isReceivingPension ? "Да" : "Не"}</Typography>
      </Grid>
      <Grid item xs={12} md={4}>
        <Typography variant="subtitle2" color="text.secondary">
          Получава други доходи с осигуровки
        </Typography>
        <Typography variant="body1">{form.isReceivingOtherInsuredIncome ? "Да" : "Не"}</Typography>
      </Grid>
      <Grid item xs={12} md={4}>
        <Typography variant="subtitle2" color="text.secondary">
          Настоящ осигурител
        </Typography>
        <Typography variant="body1">{getInsurerName(form.currentInsurer)}</Typography>
      </Grid>
    </Grid>
  );

  // Render late form details
  const renderLateFormDetails = (form) => (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Typography variant="subtitle2" color="text.secondary">
          Учебна година
        </Typography>
        <Typography variant="body1">{form.year}</Typography>
      </Grid>
    </Grid>
  );

  // Render terminate form details
  const renderTerminateFormDetails = (form) => (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="subtitle2" color="text.secondary">
          Причина за прекратяване
        </Typography>
        <Typography variant="body1">{form.terminationReason}</Typography>
      </Grid>
    </Grid>
  );

  // Render form details based on type
  const renderFormDetails = (form) => {
    switch (form.formType) {
      case "apply":
        return renderApplyFormDetails(form);
      case "late":
        return renderLateFormDetails(form);
      case "terminate":
        return renderTerminateFormDetails(form);
      default:
        return null;
    }
  };

  // Count forms by status
  const countFormsByStatus = (status) => {
    return filteredForms.filter((form) => form.formStatus === status).length;
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: { xs: 2, sm: 3 } }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <IconButton onClick={() => navigate(-1)} sx={{ mr: 1 }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h4">Формуляри за здравно осигуряване</Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
            <TextField
              label="Търсене по име или фак. номер"
              variant="outlined"
              size="small"
              value={filters.searchTerm}
              onChange={(e) => handleFilterChange("searchTerm", e.target.value)}
              sx={{ flexGrow: 1, mr: 2 }}
              InputProps={{
                endAdornment: <SearchIcon color="action" />,
              }}
            />
            <Button startIcon={<FilterIcon />} variant="outlined" onClick={() => setFilterOpen(!filterOpen)}>
              Филтри
            </Button>
          </Box>

          <Collapse in={filterOpen}>
            <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                <Typography variant="h6">Филтри</Typography>
                <IconButton size="small" onClick={() => setFilterOpen(false)}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth size="small" sx={{ minWidth: 150 }}>
                    <InputLabel>Специалност</InputLabel>
                    <Select
                      value={filters.specialty}
                      label="Специалност"
                      onChange={(e) => handleFilterChange("specialty", e.target.value)}
                    >
                      <MenuItem value="">Всички</MenuItem>
                      <MenuItem value="КСТ">КСТ</MenuItem>
                      <MenuItem value="СИТ">СИТ</MenuItem>
                      <MenuItem value="КМ">КМ</MenuItem>
                      <MenuItem value="ИКТ">ИКТ</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth size="small" sx={{ minWidth: 160 }}>
                    <InputLabel>Тип формуляр</InputLabel>
                    <Select
                      value={filters.formType}
                      label="Тип формуляр"
                      onChange={(e) => handleFilterChange("formType", e.target.value)}
                      disabled={tabValue !== 0}
                    >
                      <MenuItem value="">Всички</MenuItem>
                      <MenuItem value="apply">За текущ период</MenuItem>
                      <MenuItem value="late">За минал период</MenuItem>
                      <MenuItem value="terminate">За прекратяване</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth size="small" sx={{ minWidth: 100 }}>
                    <InputLabel>Статус</InputLabel>
                    <Select
                      value={filters.status}
                      label="Статус"
                      onChange={(e) => handleFilterChange("status", e.target.value)}
                    >
                      <MenuItem value="">Всички</MenuItem>
                      <MenuItem value="SENT">Изпратени</MenuItem>
                      <MenuItem value="SEEN">Прегледани</MenuItem>
                      <MenuItem value="APPROVED">Одобрени</MenuItem>
                      <MenuItem value="DENIED">Отказани</MenuItem>
                      <MenuItem value="RETURNED">Върнати</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
                <Button onClick={resetFilters} color="primary">
                  Изчисти филтрите
                </Button>
              </Box>
            </Paper>
          </Collapse>
        </Box>

        <Paper sx={{ width: "100%", mb: 2 }} variant="outlined">
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label={`Всички (${filteredForms.length})`} />
            <Tab label={`Текущ период (${forms.apply.length})`} />
            <Tab label={`Минал период (${forms.late.length})`} />
            <Tab label={`Прекратяване (${forms.terminate.length})`} />
          </Tabs>

          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 5 }}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Alert severity="error" sx={{ m: 2 }}>
              {error}
            </Alert>
          ) : filteredForms.length === 0 ? (
            <Alert severity="info" sx={{ m: 2 }}>
              Няма намерени формуляри, които отговарят на избраните филтри.
            </Alert>
          ) : (
            <>
              <TableContainer>
                <Table sx={{ minWidth: 650 }} size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Студент</TableCell>
                      <TableCell>Фак. номер</TableCell>
                      <TableCell>Тип формуляр</TableCell>
                      <TableCell>Статус</TableCell>
                      <TableCell>Дата</TableCell>
                      <TableCell align="right">Действия</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredForms.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((form) => (
                      <React.Fragment key={`${form.formType}-${form.formId}`}>
                        <TableRow
                          hover
                          onClick={() => toggleExpandForm(`${form.formType}-${form.formId}`)}
                          sx={{ cursor: "pointer", "&:last-child td, &:last-child th": { border: 0 } }}
                        >
                          <TableCell component="th" scope="row">
                            {form.studentFirstName} {form.studentLastName}
                          </TableCell>
                          <TableCell>{form.studentFacultyNumber}</TableCell>
                          <TableCell>{getFormTypeName(form.formType)}</TableCell>
                          <TableCell>{renderStatusChip(form.formStatus)}</TableCell>
                          <TableCell>{formatDate(form.date)}</TableCell>
                          <TableCell align="right">
                            <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
                              <Tooltip title="Преглед">
                                <IconButton
                                  size="small"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleExpandForm(`${form.formType}-${form.formId}`);
                                  }}
                                >
                                  {expandedForm === `${form.formType}-${form.formId}` ? (
                                    <ExpandLessIcon />
                                  ) : (
                                    <ExpandMoreIcon />
                                  )}
                                </IconButton>
                              </Tooltip>
                              {form.formStatus !== "APPROVED" && form.formStatus !== "DENIED" && (
                                <Tooltip title="Одобри">
                                  <IconButton
                                    size="small"
                                    color="success"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleApproveClick(
                                        form.formId,
                                        form.formType,
                                        `${form.studentFirstName} ${form.studentLastName}`
                                      );
                                    }}
                                  >
                                    <ApproveIcon />
                                  </IconButton>
                                </Tooltip>
                              )}
                              {form.formStatus !== "APPROVED" && form.formStatus !== "DENIED" && (
                                <Tooltip title="Отхвърли">
                                  <IconButton
                                    size="small"
                                    color="error"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleRejectClick(
                                        form.formId,
                                        form.formType,
                                        `${form.studentFirstName} ${form.studentLastName}`
                                      );
                                    }}
                                  >
                                    <RejectIcon />
                                  </IconButton>
                                </Tooltip>
                              )}
                            </Box>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                            <Collapse
                              in={expandedForm === `${form.formType}-${form.formId}`}
                              timeout="auto"
                              unmountOnExit
                            >
                              <Box sx={{ margin: 2 }}>
                                <Typography variant="h6" gutterBottom component="div">
                                  Детайли на формуляра
                                </Typography>
                                {renderFormDetails(form)}
                                <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end", gap: 1 }}>
                                  {form.formStatus !== "APPROVED" && form.formStatus !== "DENIED" && (
                                    <>
                                      <Button
                                        variant="outlined"
                                        color="success"
                                        startIcon={<ApproveIcon />}
                                        onClick={() =>
                                          handleApproveClick(
                                            form.formId,
                                            form.formType,
                                            `${form.studentFirstName} ${form.studentLastName}`
                                          )
                                        }
                                      >
                                        Одобри
                                      </Button>
                                      <Button
                                        variant="outlined"
                                        color="error"
                                        startIcon={<RejectIcon />}
                                        onClick={() =>
                                          handleRejectClick(
                                            form.formId,
                                            form.formType,
                                            `${form.studentFirstName} ${form.studentLastName}`
                                          )
                                        }
                                      >
                                        Отхвърли
                                      </Button>
                                    </>
                                  )}
                                </Box>
                              </Box>
                            </Collapse>
                          </TableCell>
                        </TableRow>
                      </React.Fragment>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filteredForms.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage="Редове на страница:"
                labelDisplayedRows={({ from, to, count }) => `${from}–${to} от ${count}`}
              />
            </>
          )}
        </Paper>
      </Paper>

      {/* Approval/Rejection Dialog */}
      <Dialog open={approvalDialog.open} onClose={!processingApproval ? handleDialogClose : undefined}>
        <DialogTitle>{approvalDialog.action === "approve" ? "Одобряване" : "Отхвърляне"} на формуляр</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {approvalDialog.action === "approve"
              ? `Сигурни ли сте, че искате да одобрите формуляра на ${approvalDialog.studentName}?`
              : `Сигурни ли сте, че искате да отхвърлите формуляра на ${approvalDialog.studentName}?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} disabled={processingApproval}>
            Отказ
          </Button>
          <Button
            onClick={handleConfirmAction}
            color={approvalDialog.action === "approve" ? "success" : "error"}
            variant="contained"
            disabled={processingApproval}
            startIcon={processingApproval ? <CircularProgress size={20} /> : null}
          >
            {processingApproval ? "Изпълнява се..." : approvalDialog.action === "approve" ? "Одобри" : "Отхвърли"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default AdminInsuranceForms;
