export const getDoughnutData = (data) => {
  const { labelsArr, datasetLabel, datasetBgColorsArr, dataArr} = data;

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
