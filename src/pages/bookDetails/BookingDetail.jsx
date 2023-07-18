import React, { useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import "./bookingDetail.css";
import { styled } from "@mui/material/styles";
import {
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { cancelBook, listMyBook } from "../../Redux/Actions/BookAction";
import Loading from "../../components/loadingError/Loading";
import Message from "../../components/loadingError/Error";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#0d47a1",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    // backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function BookingDetail() {
  window.scrollTo(0, 0);

  const [open, setOpen] = React.useState(false);
  const [book_Id, setBook_Id] = React.useState();

  const dispatch = useDispatch();

  const bookListMy = useSelector((state) => state.bookListMy);
  const { loading, error, books } = bookListMy;

  const bookCanceled = useSelector((state) => state.bookCanceled);
  const { loading: loadingCancel, success: successCancel } = bookCanceled;

  useEffect(() => {
    dispatch(listMyBook());
  }, [dispatch, successCancel]);

  const handleClickOpen = (book_Id) => {
    setBook_Id(book_Id)
    setOpen(true);
  }

  const cancelBookHandler = () => {
    dispatch(cancelBook(book_Id));
    setOpen(false)
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Navbar />
      <Header type="list" />
      <div className="bookContainer">
        <div className="bookWrapper">
          {loading || loadingCancel ? (
            <Loading />
          ) : error ? (
            <Message variant="alert-danger">{error}</Message>
          ) : (
            <>
              {books.length === 0 ? (
                <div className="list-book">
                  ບໍ່ມີລາຍການທີ່ທ່ານໄດ້ຈອງເຮືອນແພ
                  <br/>
                  <Link to="/" style={{ fontSize: "12px", color: "#003580" }}>
                    ໄປທີ່ໜ້າຫຼັກເພື່ອສັ່ງຈອງເຮືອນແພ
                  </Link>
                </div>
              ) : (
                <>
                  <h1 className="list-book">ລາຍການການຈອງຂອງລູກຄ້າ</h1>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                      <TableHead>
                        <TableRow>
                          <StyledTableCell>ຊື່ເຮືອນແພ</StyledTableCell>
                          <StyledTableCell align="right">
                            ວັນທີ່ເຊັກອິນ ແລະ ເຊັກເອົ້າ
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            ຈຳນວນເຮືອນແພ
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            ສະຖານະ
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            ລວມລາຄາທັງໝົດ
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            ຄ່າມັດຈຳ 20%
                          </StyledTableCell>
                          <StyledTableCell align="right"></StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {books.map((book) => (
                          <StyledTableRow key={books._id}>
                            <StyledTableCell component="th" scope="row">
                              {book.bookItems[0].name}
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              {book.checkInDate} ຫາ {book.checkOutDate}
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              {book.bookItems[0].qty}
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              <span>
                                {book.isCanceled ? (
                                  <p className="isCancel">
                                    ທ່ານໄດ້ຍົກເລີກການຈອງ
                                  </p>
                                ) : book.isPaid ? (
                                  <p className="isPaid">ຈ່າຍເງິນແລ້ວ</p>
                                ) : book.notPaid ? (
                                  <p className="notPaid">
                                    ທ່ານຍັງບໍ້ທັນໄດ້ຊຳລະເງິນເທື່ອ
                                  </p>
                                ) : (
                                  <p className="Wait">ລໍຖ້າພະນັກງານກວດສອບ</p>
                                )}
                              </span>
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              {book.bookItems[0].price}
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              {book.bookItems[0].deposit}
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              {book.isCanceled ? (
                                <Button
                                variant="outlined"
                                onClick={() => handleClickOpen(book._id)}
                                disabled
                                sx={{color:"red"}}
                              >
                                ຍົກເລີກການຈອງ
                              </Button>
                              ) : (
                                <Button
                                variant="outlined"
                                onClick={() => handleClickOpen(book._id)}
                                color="error"
                                sx={{color:"red"}}
                              >
                                ຍົກເລີກການຈອງ
                              </Button>
                              )}
                              {/* <button type="submit" onClick={() => cancelBookHandler(book._id)}>ຍົກເລີກການຈອງ</button> */}
                            </StyledTableCell>
                            <Dialog
                              open={open}
                              onClose={handleClose}
                              aria-labelledby="alert-dialog-title"
                              aria-describedby="alert-dialog-description"
                            >
                              <DialogTitle id="alert-dialog-title">
                                {"ທ່ານໝັ້ນໃຈແລ້ວບໍທີ່ຈະຍົກເລີກການຈອງ?"}
                              </DialogTitle>
                              <DialogActions>
                                <Button onClick={handleClose}>ຍົກເລີກ</Button>
                                <Button onClick={cancelBookHandler} autoFocus>
                                  ຍອມຮັບ
                                </Button>
                              </DialogActions>
                            </Dialog>
                          </StyledTableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </>
              )}
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default BookingDetail;
