import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import moment from "moment";

// Define styles for the PDF
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    backgroundColor: "#ffffff", // Light background
  },
  mb2: {
    marginBottom: 20,
  },
  ms3: {
    marginLeft: 15,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#333", // Dark text for contrast
  },
  subheader: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "left",
    marginBottom: 5,
    color: "#444", // Slightly lighter shade
  },
  section: {
    marginBottom: 10,
  },
  label: {
    fontWeight: "bold",
    fontSize: 12,
    color: "#333",
  },
  content: {
    fontSize: 12,
    marginBottom: 5,
    color: "#555", // Lighter content text for readability
  },
  hr: {
    borderBottom: 1,
    borderColor: "#eee", // Light separator line
    marginVertical: 10,
  },
  table: {
    width: "100%",
    borderTop: "1px solid #eee", // Light border for clean separation
    borderBottom: "1px solid #eee",
    marginBottom: 10,
  },
  tableRow: {
    display: "flex",
    flexDirection: "row",
    padding: 5,
  },
  tableCell: {
    flex: 1,
    padding: 5,
    fontSize: 12,
    borderRight: "1px solid #eee", // Light borders for table cells
  },
  footer: {
    marginTop: 30,
    fontSize: 10,
    textAlign: "center",
    color: "#888", // Lighter footer text
  },
});

const AlumniReport = ({ user, generatedBy }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.mb2}>
        <Text style={styles.header}>Pangasinan State University - San Carlos City Campus</Text>
        <Text style={styles.header}>Alumni Report</Text>
      </View>

      {/* Personal Information Section */}
      <View style={styles.section}>
        <Text style={styles.subheader}>Personal Information</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>
              <Text style={styles.label}>Name: </Text>
              {user?.first_name} {user?.last_name}
            </Text>
            <Text style={styles.tableCell}>
              <Text style={styles.label}>Email: </Text>
              {user?.email || "NA"}
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>
              <Text style={styles.label}>Date of Birth: </Text>
              {user?.birthday ? new Date(user.birthday).toLocaleDateString() : "NA"}
            </Text>
            <Text style={styles.tableCell}>
              <Text style={styles.label}>Address: </Text>
              {user?.address || "NA"}
            </Text>
          </View>
        </View>
      </View>

      {/* Educational Details Section */}
      <View style={styles.section}>
        <Text style={styles.subheader}>Educational Details</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>
              <Text style={styles.label}>Course: </Text>
              {user?.course?.course_name || "NA"}
            </Text>
            <Text style={styles.tableCell}>
              <Text style={styles.label}>Batch: </Text>
              {user?.year || "NA"}
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>
              <Text style={styles.label}>Specialization: </Text>
              {user?.specialization || "NA"}
            </Text>
            <Text style={styles.tableCell}>
              <Text style={styles.label}>Honors: </Text>
              {user?.honors || "NA"}
            </Text>
          </View>
        </View>
      </View>

      {/* Employment Status Section */}
      <View style={styles.section}>
        <Text style={styles.subheader}>Employment Status</Text>
        <Text style={styles.content}>
          <Text style={styles.label}>Status: </Text>
          {user?.employment_status?.status?.status || "Unknown"}
        </Text>
        <Text style={styles.content}>
          <Text style={styles.label}>Company: </Text>
          {user?.employment_status?.company || "NA"}
        </Text>
        <Text style={styles.content}>
          <Text style={styles.label}>Type: </Text>
          {user?.employment_status?.type || "NA"}
        </Text>
      </View>

      {/* Employment History Section */}
      <View style={styles.section}>
        <Text style={styles.subheader}>Employment History</Text>
        {user?.statuses?.map((status, index) => (
          <View key={index} style={styles.section}>
            <Text style={styles.content}>
              <Text style={styles.label}>Status: </Text>
              {status.status.status}
            </Text>
            {status.status.status === 'Employed' && (
              <>
                <Text style={styles.content}>
                  <Text style={styles.label}>Company: </Text>
                  {status.answers.find((answer) => answer.employment_questions_ID === 3)?.answer || "No answer available"}
                </Text>
                <Text style={styles.content}>
                  <Text style={styles.label}>Type: </Text>
                  {status.answers.find((answer) => answer.employment_questions_ID === 2)?.answer || "No answer available"}
                </Text>
              </>
            )}
            <Text style={styles.content}>
              <Text style={styles.label}>Date: </Text>
              {moment(status.created_at).format('MMMM DD YYYY')}
            </Text>
            <View style={styles.hr} />
          </View>
        ))}
      </View>

      {/* Footer Section */}
      <Text style={styles.footer}>
        Report auto-generated by {generatedBy || "System"} on {moment().format('MMMM DD YYYY, h:mm A')}.
      </Text>
    </Page>
  </Document>
);

export default AlumniReport;
