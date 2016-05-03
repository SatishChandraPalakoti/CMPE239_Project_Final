library("dplyr")
library("data.table")
library("maps")
library("stringi")
library("stringr")

col <- c("Income",
         "Purpose",
         "Coop",
         "Term",
         "SellSt",
         "First",
         "BoGender",
         "BoAge",
         "NumUnits",
         "Rate",
         "Borrower Credit Score",
         "PropType")

test <- fread("/Users/Sharath/Downloads/Banking.csv",header = TRUE, select = col)

data <- tbl_df(test)

colnames(data) <- c("income",
                    "loan_purpose",
                    "coop_unit",
                    "trem_months",
                    "state",
                    "first_hoam_loan",
                    "gender",
                    "age",
                    "num_units",
                    "int_rate",
                    "credit_score",
                    "prop_type")

prop_typ <- as.numeric(gsub("PT", "", data$prop_type, fixed = TRUE))

int_rate <- as.numeric(data$int_rate * 100)

mgsub <- function(pattern, replacement, x, ...) {
  if (length(pattern)!=length(replacement)) {
    stop("pattern and replacement do not have the same length.")
  }
  result <- x
  for (i in 1:length(pattern)) {
    result <- gsub(pattern[i], replacement[i], result, ...)
  }
  result
}

x = c("CT" , "MA" , "ME" , "NH" , "VT" , "IL" , "WI" , "MN" , "KY" , "OH" , "TN" , "MO" , "IA" , 
      "KS" , "SD" , "ND" , "MI" , "IN" , "NY" , "NJ" , "PA" , "WV" , "CA" , "NE" , "CO" , "OK" , "WY")

y = c("01", "02" , "03" , "04" , "05" , "06" , "07" , "08" , "09" , "10" , "11" , "12" , "13" , "14" , 
      "15" , "16" , "17" , "18" , "19" , "20" , "21" , "22" , "23" , "24" , "25" , "26" , "27")

state_clean <- as.numeric(mgsub(x,y, data$state))

data_new <- data.frame(data[1],data[2],data[3],data[4],state_clean,data[6],data[7],data[8],
                       data[9],data[11],prop_typ,int_rate)

write.csv(data_new,"/Users/dummyadmin/Desktop/239/Hoam_Loan_clean.csv",quote = FALSE, row.names = FALSE)
