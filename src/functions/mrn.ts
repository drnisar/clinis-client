export const refineMRN = (MRN: string) => {
  const pattern1 = /^[1-9]-\d{4}$/;
  if (pattern1.test(MRN)) {
    const first = MRN.split("-")[0];
    let last = MRN.split("-")[1];
    if (last.length == 3) last = "0" + last;

    return "K03-" + first + "0000000" + last;
  }

  const pattern2 = /^[1-9]\d{6}$/;
  if (pattern2.test(MRN)) {
    return "K03-0000" + MRN;
  }

  const pattern3 = /^[1-9]-\d{3}$/;
  if (pattern3.test(MRN)) {
    const first = MRN.split("-")[0];
    let last = MRN.split("-")[1];
    // if (last.length == 2) last = "0" + last;

    return "K03-" + first + "0000000" + last;
  }

  const pattern4 = /^\d{3}-\d{4}$/;
  if (pattern4.test(MRN)) {
    const first = MRN.substring(0, 3);
    let last = MRN.substring(4, 8);
    // if (first.length == 2) first = "0" + first;

    return "K03-" + first + "0000" + last;
  }

  const pattern5 = /^\d{3}-\d{3}$/;
  if (pattern5.test(MRN)) {
    let first = MRN.substring(0, 3);
    let last = MRN.substring(4, 7);
    // if (first.length == 2) first = "0" + first;

    return "K03-" + first + "00000" + last;
  } else {
    throw new Error("Invalid MRN format");
  }
};
