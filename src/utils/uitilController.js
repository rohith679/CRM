const utilController = {
  textCapitalise: function capitalizeFirstLetter(string) {
    return string?.charAt(0)?.toUpperCase() + string?.slice(1);
  },

  isEncoded: (str) => {
    try {
      window.atob(str);
      return true;
    } catch {
      return false;
    }
  },
  // getQueryParams: (history, param) => {
  //   // pass the history object as argument
  //   if (!history) throw new Error("History object is undefined");
  //   const urlParams = new URLSearchParams(history.location.search);
  //   const payload = urlParams.get(param);
  //   return payload;
  // },
  getQueryParams: (search, param) => {
    if (!search) return null;
    const urlParams = new URLSearchParams(search);
    return urlParams.get(param);
  },
  getDateTime: (epochdate) => {
    return new Date(epochdate * 1000)?.toLocaleDateString("en-in");
  },
  getFormattedDateandTime: (epochdate) => {
    if (epochdate) {
      const date = new Date(epochdate * 1000);
      const options = {
        weekday: "short",
        month: "short",
        day: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      };
      return date.toLocaleDateString("en-US", options);
    }
    return "";
  },
  timeAgo: (timestamp) => {
    // Normalize to milliseconds
    if (timestamp < 10000000000) {
      timestamp *= 1000; // convert seconds to milliseconds
    }

    const now = Date.now();
    const diff = now - timestamp;

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (seconds < 60) return "just now";
    if (minutes < 60) return `${minutes} min ago`;
    if (hours < 24) return `${hours} h ago`;
    return `${days} d ago`;
  },
  getFormattedTime: (epochdate) => {
    if (epochdate) {
      const date = new Date(epochdate * 1000); // epoch in seconds
      const options = {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true, // set to false if you prefer 24-hour format
      };
      return date.toLocaleTimeString("en-US", options);
    }
    return "";
  },

  getFormattedDate: (epochdate) => {
    const date = new Date(epochdate * 1000);
    const options = {
      weekday: "short",
      month: "short",
      day: "2-digit",
      year: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  },

  getWeekMonthYear: (epochdate) => {
    const date = new Date(epochdate * 1000);

    const weekday = date.toLocaleDateString("en-US", { weekday: "short" }); // e.g., "Mon"
    const month = date.toLocaleDateString("en-US", { month: "short" }); // e.g., "Jul"
    const year = date.toLocaleDateString("en-US", { year: "2-digit" }); // e.g., "25"

    return `${weekday}, ${month} ${year}`;
  },

  getMonthDayDate: (epochdate) => {
    const date = new Date(epochdate * 1000);
    const options = {
      weekday: "short",
      month: "short",
      day: "2-digit",
    };
    return date.toLocaleDateString("en-US", options);
  },
  getDate: (epochdate) => {
    const date = new Date(epochdate * 1000);
    const options = {
      month: "short",
      day: "2-digit",
      year: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  },

  slotTimeStamp: function (timestamp) {
    const date = new Date(timestamp * 1000);
    const today = new Date();
    const tomorrow = new Date();

    // Set 'today' and 'tomorrow' to midnight for accurate comparison
    today.setHours(0, 0, 0, 0);
    tomorrow.setHours(0, 0, 0, 0);
    tomorrow.setDate(today.getDate() + 1);

    // Set the given date to midnight for comparison
    const inputDate = new Date(date);
    inputDate.setHours(0, 0, 0, 0);

    // Compare the input date with today and tomorrow
    if (inputDate.getTime() === today.getTime()) {
      return "Today";
    } else if (inputDate.getTime() === tomorrow.getTime()) {
      return "Tomorrow";
    } else {
      return inputDate.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
      });
    }
  },
  userSlotTimeStamp: function (timestamp) {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString("en-GB", {
      month: "short",
      day: "2-digit",
    });
  },
  getRelativeTime: function (timestampInSeconds) {
    const now = Date.now(); // in milliseconds
    const timestamp = timestampInSeconds * 1000; // convert to milliseconds
    const diffMs = now - timestamp;

    const msInDay = 1000 * 60 * 60 * 24;
    const days = Math.floor(diffMs / msInDay);

    if (days < 1) return "Today";
    if (days === 1) return "1 day ago";
    if (days <= 6) return `${days} days ago`;
    if (days <= 13) return "1 week ago";
    if (days <= 20) return "2 weeks ago";
    if (days <= 27) return "3 weeks ago";
    if (days <= 34) return "4 weeks ago";

    const weeks = Math.floor(days / 7);
    return `${weeks} weeks ago`;
  },

  downloadUrl: (Image) => {
    const link = document.createElement("a");
    link.href = Image;
    link.setAttribute("download", "image.png");
    document.body.appendChild(link);
    link.click();
  },
  //To capitalize each word first letter
  formatTextToCapitalize: (value) => {
    return value
      ?.split(/(?=[A-Z])/)
      .map((word) => word?.charAt(0).toUpperCase() + word?.slice(1))
      .join(" ");
  },
  truncateMiddle: (str, maxLength) => {
    if (str?.length <= maxLength) return str;
    const startLength = Math.ceil(maxLength / 2);
    const endLength = Math.floor(maxLength / 2);
    return (
      str?.substr(0, startLength) + "..." + str?.substr(str?.length - endLength)
    );
  },
  roundToTwo: (num) => {
    return Math.round(num * 100) / 100;
  },

  camelCaseToNormal: (string) => {
    if (!string) return "";

    return string
      .replace(/([a-z])([A-Z])/g, "$1 $2") // Handles multiple camel case transitions
      .replace(/^./, string[0].toUpperCase()); // Capitalizes the first letter
  },

  stringToColor: (string) => {
    let hash = 0;
    for (let i = 0; i < string?.length; i++) {
      hash = string?.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = "#";
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xff;
      color += ("00" + value?.toString(16)).substr(-2);
    }
    return color;
  },

  countStatuses: (assignedEmployees) => {
    const statusCounts = assignedEmployees.reduce((acc, employee) => {
      const status = employee.status;

      // Initialize the status count if it doesn't exist
      if (!acc[status]) {
        acc[status] = 0;
      }

      // Increment the status count
      acc[status]++;

      return acc;
    }, {});

    // Format the result as per the requirement
    const formattedCounts = Object.entries(statusCounts).map(
      ([status, count]) => {
        switch (status) {
          case "pending":
            return `${count}p`;
          case "in-progress":
            return `${count}ip`;
          case "completed":
            return `${count}c`;
          case "cancelled":
            return `${count}ca`;
          default:
            return "";
        }
      }
    );

    return formattedCounts.join(", ");
  },
  convertTimeIntoTimestamp: function (baseTimestamp, timeString) {
    const date = new Date(baseTimestamp * 1000);
    date.setMinutes(date.getMinutes() + 330);

    const [time, period] = timeString.split(" ");
    let [hours, minutes] = time.split(":").map(Number);
    if (period.toUpperCase() === "PM" && hours !== 12) {
      hours += 12;
    } else if (period.toUpperCase() === "AM" && hours === 12) {
      hours = 0;
    }

    date.setHours(hours, minutes, 0, 0);

    const istTimestamp = date.getTime() / 1000;
    return istTimestamp;
  },

  // Convert UNIX timestamp to readable date

  exportToExcel: (data, fileName = "export.xlsx") => {
    if (!data || data.length === 0) {
      return;
    }

    // Transform data before export
    const transformed = data.map((item) => {
      const { createAt, updateAt, ...rest } = item; // remove raw fields
      return {
        ...rest,
        CreatedAt: formatDate(createAt),
        UpdatedAt: formatDate(updateAt),
      };
    });

    // Step 1: JSON -> worksheet
    const worksheet = XLSX.utils.json_to_sheet(transformed);

    // Step 2: Create workbook & append sheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

    // Step 3: Export
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, fileName);
  },
};

export default utilController;
