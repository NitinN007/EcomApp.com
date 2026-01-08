exports.mockPayment = async (req, res) => {
  const fakePaymentId = "mock_pay_" + Date.now();

  res.json({
    success: true,
    paymentId: fakePaymentId,
  });
};
