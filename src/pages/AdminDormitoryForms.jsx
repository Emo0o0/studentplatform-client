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
  Collapse,
  Tooltip,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  Search as SearchIcon,
  CheckCircle as ApproveIcon,
  Cancel as RejectIcon,
  FilterList as FilterIcon,
  Close as CloseIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { fetchAdminDormitoryForms, updateDormitoryFormStatus } from "../services/adminFormsService";

function AdminDormitoryForms() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [forms, setForms] = useState([]);
  const [filteredForms, setFilteredForms] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [expandedForm, setExpandedForm] = useState(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    specialty: "",
    hasKeepRoom: "",
    status: "",
    searchTerm: "",
  });
  const [tabValue, setTabValue] = useState(0);

  // Approval dialog states
  const [approvalDialog, setApprovalDialog] = useState({
    open: false,
    formId: null,
    action: null, // 'approve' or 'reject'
    studentName: "",
  });

  // Approval processing state
  const [processingApproval, setProcessingApproval] = useState(false);

  useEffect(() => {
    const getDormitoryForms = async () => {
      try {
        setLoading(true);
        const data = await fetchAdminDormitoryForms(filters.specialty);
        setForms(data.forms || []);
        setFilteredForms(data.forms || []);
      } catch (err) {
        console.error("Error fetching dormitory forms:", err);
        setError("Възникна грешка при зареждането на формулярите. Моля, опитайте отново.");
      } finally {
        setLoading(false);
      }
    };

    getDormitoryForms();
  }, [filters.specialty]);

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
    let result = [...forms];

    // Filter by status based on tab
    if (tabValue === 1) {
      result = result.filter((form) => form.formStatus === "SENT");
    } else if (tabValue === 2) {
      result = result.filter((form) => form.formStatus === "SEEN");
    } else if (tabValue === 3) {
      result = result.filter((form) => form.formStatus === "APPROVED");
    } else if (tabValue === 4) {
      result = result.filter((form) => form.formStatus === "DENIED");
    } else if (tabValue === 5) {
      result = result.filter((form) => form.formStatus === "RETURNED");
    }

    // Apply custom filters
    if (filters.specialty) {
      result = result.filter((form) => form.specialty === filters.specialty);
    }

    if (filters.hasKeepRoom !== "") {
      const hasKeepRoom = filters.hasKeepRoom === "true";
      result = result.filter((form) => form.hasKeepRoomForm === hasKeepRoom);
    }

    if (filters.status && tabValue === 0) {
      result = result.filter((form) => form.formStatus === filters.status);
    }

    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      result = result.filter(
        (form) =>
          form.studentFirstName.toLowerCase().includes(searchLower) ||
          form.studentLastName.toLowerCase().includes(searchLower) ||
          form.studentFacultyNumber.toLowerCase().includes(searchLower)
      );
    }

    setFilteredForms(result);
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
      hasKeepRoom: "",
      status: "",
      searchTerm: "",
    });
    setFilterOpen(false);
  };

  const toggleExpandForm = (formId) => {
    setExpandedForm(expandedForm === formId ? null : formId);
  };

  const handleApproveClick = (formId, studentName) => {
    setApprovalDialog({
      open: true,
      formId,
      action: "approve",
      studentName,
    });
  };

  const handleRejectClick = (formId, studentName) => {
    setApprovalDialog({
      open: true,
      formId,
      action: "reject",
      studentName,
    });
  };

  const handleDialogClose = () => {
    setApprovalDialog({
      open: false,
      formId: null,
      action: null,
      studentName: "",
    });
  };

  const handleConfirmAction = async () => {
    try {
      setProcessingApproval(true);
      const { formId, action } = approvalDialog;
      const newStatus = action === "approve" ? "APPROVED" : "DENIED";

      await updateDormitoryFormStatus(formId, newStatus);

      // Update local state to reflect the change
      setForms(forms.map((form) => (form.formId === formId ? { ...form, formStatus: newStatus } : form)));

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

  // Get relation name in Bulgarian
  const getFamilyRelationName = (relation) => {
    const relations = {
      FATHER: "Баща",
      MOTHER: "Майка",
      BROTHER: "Брат",
      SISTER: "Сестра",
      SPOUSE: "Съпруг/а",
      CHILD: "Дете",
      OTHER: "Друго",
    };
    return relations[relation] || relation;
  };

  // Format birth date
  const formatBirthDate = (dateString) => {
    if (!dateString) return "-";

    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat("bg-BG", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }).format(date);
    } catch (e) {
      return dateString || "-";
    }
  };

  // Render family members list
  const renderFamilyMembers = (familyMembers) => {
    if (!familyMembers || familyMembers.length === 0) {
      return <Typography variant="body2">Няма добавени членове на семейството</Typography>;
    }

    return (
      <List dense>
        {familyMembers.map((member, index) => (
          <ListItem key={index} sx={{ py: 0.5 }}>
            <ListItemText
              primary={
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Chip
                    label={getFamilyRelationName(member.familyMemberRelation)}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                  <Typography variant="body1">{member.name || "-"}</Typography>
                </Box>
              }
              secondary={
                <Grid container spacing={1} sx={{ mt: 0.5 }}>
                  {member.address && (
                    <Grid item xs={12} sm={member.dateOfBirth ? 4 : 6}>
                      <Typography variant="body2" component="span" color="text.secondary">
                        Адрес:
                      </Typography>
                      <Typography variant="body2" component="span" sx={{ ml: 1 }}>
                        {member.address}
                      </Typography>
                    </Grid>
                  )}
                  {member.phoneNumber && (
                    <Grid item xs={12} sm={member.dateOfBirth ? 4 : 6}>
                      <Typography variant="body2" component="span" color="text.secondary">
                        Телефон:
                      </Typography>
                      <Typography variant="body2" component="span" sx={{ ml: 1 }}>
                        {member.phoneNumber}
                      </Typography>
                    </Grid>
                  )}
                  {member.dateOfBirth && (
                    <Grid item xs={12} sm={4}>
                      <Typography variant="body2" component="span" color="text.secondary">
                        Дата на раждане:
                      </Typography>
                      <Typography variant="body2" component="span" sx={{ ml: 1 }}>
                        {formatBirthDate(member.dateOfBirth)}
                      </Typography>
                    </Grid>
                  )}
                </Grid>
              }
            />
          </ListItem>
        ))}
      </List>
    );
  };

  // Render keep room info
  const renderKeepRoomInfo = (form) => {
    if (!form.hasKeepRoomForm) {
      return null;
    }

    return (
      <Box
        sx={{ mt: 3, p: 2, bgcolor: "background.paper", borderRadius: 1, border: "1px dashed", borderColor: "divider" }}
      >
        <Typography variant="h6" gutterBottom>
          Заявка за запазване на стая
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary">
              Номер на блок
            </Typography>
            <Typography variant="body1">{form.keepRoomFormBuildingNumber}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary">
              Номер на стая
            </Typography>
            <Typography variant="body1">{form.keepRoomFormRoomNumber}</Typography>
          </Grid>
        </Grid>
      </Box>
    );
  };

  // Count forms by status
  const countFormsByStatus = (status) => {
    return forms.filter((form) => form.formStatus === status).length;
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: { xs: 2, sm: 3 } }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <IconButton onClick={() => navigate(-1)} sx={{ mr: 1 }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h4">Формуляри за общежитие</Typography>
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
                  <FormControl fullWidth size="small" sx={{ minWidth: 200 }}>
                    <InputLabel>Заявка за запазване на стая</InputLabel>
                    <Select
                      value={filters.hasKeepRoom}
                      label="Заявка за запазване на стая"
                      onChange={(e) => handleFilterChange("hasKeepRoom", e.target.value)}
                    >
                      <MenuItem value="">Всички</MenuItem>
                      <MenuItem value="true">Да</MenuItem>
                      <MenuItem value="false">Не</MenuItem>
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
                      disabled={tabValue !== 0}
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
            <Tab label={`Всички (${forms.length})`} />
            <Tab label={`Изпратени (${countFormsByStatus("SENT")})`} />
            <Tab label={`Прегледани (${countFormsByStatus("SEEN")})`} />
            <Tab label={`Одобрени (${countFormsByStatus("APPROVED")})`} />
            <Tab label={`Отказани (${countFormsByStatus("DENIED")})`} />
            <Tab label={`Върнати (${countFormsByStatus("RETURNED")})`} />
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
                      <TableCell>Запазване на стая</TableCell>
                      <TableCell>Членове на семейството</TableCell>
                      <TableCell>Статус</TableCell>
                      <TableCell align="right">Действия</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredForms.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((form) => (
                      <React.Fragment key={form.formId}>
                        <TableRow
                          hover
                          onClick={() => toggleExpandForm(form.formId)}
                          sx={{ cursor: "pointer", "&:last-child td, &:last-child th": { border: 0 } }}
                        >
                          <TableCell component="th" scope="row">
                            {form.studentFirstName} {form.studentLastName}
                          </TableCell>
                          <TableCell>{form.studentFacultyNumber}</TableCell>
                          <TableCell>{form.hasKeepRoomForm ? "Да" : "Не"}</TableCell>
                          <TableCell>
                            {form.familyMembers?.length || 0} {form.familyMembers?.length === 1 ? "член" : "членове"}
                          </TableCell>
                          <TableCell>{renderStatusChip(form.formStatus)}</TableCell>
                          <TableCell align="right">
                            <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
                              <Tooltip title="Преглед">
                                <IconButton
                                  size="small"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleExpandForm(form.formId);
                                  }}
                                >
                                  {expandedForm === form.formId ? <ExpandLessIcon /> : <ExpandMoreIcon />}
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
                            <Collapse in={expandedForm === form.formId} timeout="auto" unmountOnExit>
                              <Box sx={{ margin: 2 }}>
                                <Typography variant="h6" gutterBottom component="div">
                                  Детайли на формуляра
                                </Typography>
                                <Grid container spacing={2} sx={{ mb: 2 }}>
                                  <Grid item xs={12} md={6}>
                                    <Typography variant="subtitle2" color="text.secondary">
                                      Факултетен номер
                                    </Typography>
                                    <Typography variant="body1">{form.studentFacultyNumber}</Typography>
                                  </Grid>
                                  <Grid item xs={12} md={6}>
                                    <Typography variant="subtitle2" color="text.secondary">
                                      Дата на подаване
                                    </Typography>
                                    <Typography variant="body1">{formatDate(form.date)}</Typography>
                                  </Grid>
                                </Grid>

                                <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
                                  Членове на семейството
                                </Typography>
                                {renderFamilyMembers(form.familyMembers)}

                                {renderKeepRoomInfo(form)}

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

export default AdminDormitoryForms;
