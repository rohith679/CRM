import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

// Convert UNIX timestamp to readable date
const formatDate = (timestamp) => {
  if (!timestamp) return "";
  // handle both seconds & ms
  const date = new Date(
    timestamp.toString().length === 10 ? timestamp * 1000 : timestamp
  );
  return date.toLocaleString(); // 👈 you can customize format if needed
};

const formatRating = (value) => {
  if (!value) return "";
  return `${value} Star${value > 1 ? "s" : ""}`;
  // 👉 Or use descriptive labels:
  // const labels = {
  //   1: "Poor (1 Star)",
  //   2: "Fair (2 Stars)",
  //   3: "Good (3 Stars)",
  //   4: "Very Good (4 Stars)",
  //   5: "Excellent (5 Stars)"
  // };
  // return labels[value] || `${value} Stars`;
};

export const exportToExcel = (
  data,
  fileName = "export.xlsx",
  fieldMap = {}
) => {
  if (!data || data.length === 0) return;

  // Step 1: Transform based on fieldMap
  const transformed = data.map((item) => {
    const row = {};

    Object.entries(fieldMap).forEach(([field, header]) => {
      if (field === "createAt" || field === "updateAt") {
        row[header] = formatDate(item[field]);
      } else if (field === "rating") {
        row[header] = formatRating(item[field]); // ✅ convert rating
      } else {
        row[header] = item[field];
      }
    });
    return row;
  });

  // Step 2: JSON → worksheet
  const worksheet = XLSX.utils.json_to_sheet(transformed);

  // Step 3: Workbook
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

  // Step 4: Save file
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(blob, fileName);
};
export default exportToExcel;
