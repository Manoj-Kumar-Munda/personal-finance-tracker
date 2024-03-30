export const getDoughnutData = (data) => {
  const { labelsArr, datasetLabel, datasetBgColorsArr, dataArr } = data;

  if (!labelsArr) return new Error("Labels are missing");
  if (!datasetLabel) return new Error("Datasets label is missing");
  if (!datasetBgColorsArr) return new Error("DatasetColors are missing");
  if (!dataArr) return new Error("Dataset data is missing");

  if (!(labelsArr.length === datasetBgColorsArr.length)) {
    return new Error("Number of labels and bgColors should be same ");
  }
  return {
    labels: [...labelsArr],
    datasets: [
      {
        label: datasetLabel,
        backgroundColor: [...datasetBgColorsArr],
        data: [...dataArr],
      },
    ],
  };
};

export const dateToString = (dateVal) => {
  const date = new Date(dateVal);

  const year = date.getFullYear();
  const month = date.getMonth()+1;
  const day = date.getDate();
  const formattedDate =  day+"-"+month+"-"+year;
  return formattedDate;
};

export const getIndianLocalTime = (date) => {
  const dateObj = new Date(date)
  const options = {
    timeZone: "Asia/Kolkata", // Setting time zone to Indian Standard Time
    hour12: true, // Whether to use 12-hour clock format
    hour: "numeric",
    minute: "numeric", 
    second: "numeric", 
  };

  // Get the local Indian time string
  const indianTime = dateObj.toLocaleTimeString("en-IN", options);

  console.log("Indian Time:", indianTime);
  return indianTime;
};
