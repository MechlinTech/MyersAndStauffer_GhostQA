import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import { TableBody, TableCell } from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useStyles, StyledTableCell } from "./styles";

export function RequestStateTable({ data }) {
  const classes = useStyles();
  return (
    <TableContainer>
      <Table>
        <TableHead style={{ height: "34px" }}>
          <TableRow>
            <StyledTableCell first colSpan={2}>
              Transactions
            </StyledTableCell>
            <StyledTableCell>Sample</StyledTableCell>
            <StyledTableCell>Avg. Response Time (ms)</StyledTableCell>
            <StyledTableCell>Avg. Hit’s</StyledTableCell>
            <StyledTableCell>90 % (ms)</StyledTableCell>
            <StyledTableCell>95 % (ms)</StyledTableCell>
            <StyledTableCell>99 % (ms)</StyledTableCell>
            <StyledTableCell>Min. Response Time (ms)</StyledTableCell>
            <StyledTableCell>Max. Response Time (ms)</StyledTableCell>
            <StyledTableCell>Average Bandwidth KB/S</StyledTableCell>
            <StyledTableCell last>Error Percentage</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {data?.map((row, index) => (
            <TableRow key={index}>
              <StyledTableCell first colSpan={2}>{row.transactions}</StyledTableCell>
              <StyledTableCell colSpan={2}>{row.sample}</StyledTableCell>
              <StyledTableCell>{row.avgResponseTime}</StyledTableCell>
              <StyledTableCell>{row.avgHits}</StyledTableCell>
              <StyledTableCell>{row.line904}</StyledTableCell>
              <StyledTableCell>{row.line954}</StyledTableCell>
              <StyledTableCell>{row.line994}</StyledTableCell>
              <StyledTableCell>{row.minResponseTime}</StyledTableCell>
              <StyledTableCell>{row.maxResponseTime}</StyledTableCell>
              <StyledTableCell>{row.avgBandwidth}</StyledTableCell>
              <StyledTableCell last>{row.errorPercentage}</StyledTableCell>
            </TableRow>
          ))} */}
          {data && data.summary && (
            <TableRow>
              <StyledTableCell first colSpan={2}>
                All
              </StyledTableCell>
              <StyledTableCell>{data.summary.sampleCount}</StyledTableCell>
              <StyledTableCell>{data.summary.medianResTime}</StyledTableCell>
              <StyledTableCell>
                {typeof data.summary.sentKBytesPerSec === "number"
                  ? data.summary.sentKBytesPerSec.toFixed(2)
                  : null}
              </StyledTableCell>
              <StyledTableCell>
                {typeof data.summary.pct3ResTime === "number"
                  ? data.summary.pct3ResTime.toFixed(2)
                  : null}
              </StyledTableCell>
              <StyledTableCell>
                {typeof data.summary.pct2ResTime === "number"
                  ? data.summary.pct2ResTime.toFixed(2)
                  : null}
              </StyledTableCell>
              <StyledTableCell>
                {typeof data.summary.pct1ResTime === "number"
                  ? data.summary.pct1ResTime.toFixed(2)
                  : null}
              </StyledTableCell>
              <StyledTableCell>
                {typeof data.summary.minResTime === "number"
                  ? data.summary.minResTime.toFixed(2)
                  : null}
              </StyledTableCell>
              <StyledTableCell>
                {typeof data.summary.maxResTime === "number"
                  ? data.summary.maxResTime.toFixed(2)
                  : null}
              </StyledTableCell>
              <StyledTableCell>
                {typeof data.summary.receivedKBytesPerSec === "number"
                  ? data.summary.receivedKBytesPerSec.toFixed(2)
                  : null}
              </StyledTableCell>
              <StyledTableCell last>{data.summary.errorPct}</StyledTableCell>
            </TableRow>
          )}
          {data?.results
            ? data?.results?.map((item, index) => (
                <React.Fragment key={index}>
                  {/* Total row */}
                  {/* {item.Total && item.Total && (
                    <TableRow>
                      <StyledTableCell first colSpan={2}>{item.Total.transaction}</StyledTableCell>
                      <StyledTableCell>{item.Total.sample}</StyledTableCell>
                      <StyledTableCell>{item.Total.medianResTime}</StyledTableCell>
                      <StyledTableCell>{item.Total.sentKBytesPerSec}</StyledTableCell>
                      <StyledTableCell>{item.Total.pct3ResTime}</StyledTableCell>
                      <StyledTableCell>{item.Total.pct2ResTime}</StyledTableCell>
                      <StyledTableCell>{item.Total.pct1ResTime}</StyledTableCell>
                      <StyledTableCell>{item.Total.minResTime}</StyledTableCell>
                      <StyledTableCell>{item.Total.maxResTime}</StyledTableCell>
                      <StyledTableCell>{item.Total.receivedKBytesPerSec}</StyledTableCell>
                      <StyledTableCell last>{item.Total.errorPct}</StyledTableCell>
                    </TableRow>
                  )} */}

                  {/* Home Page row */}
                  {item.home_page && item.home_page && (
                    <TableRow>
                      <StyledTableCell first colSpan={2}>
                        {item.home_page.transaction}
                      </StyledTableCell>
                      <StyledTableCell>{item.home_page.sample}</StyledTableCell>
                      <StyledTableCell>
                        {item.home_page.medianResTime}
                      </StyledTableCell>
                      <StyledTableCell>
                        {item.home_page.sentKBytesPerSec}
                      </StyledTableCell>
                      <StyledTableCell>
                        {item.home_page.pct3ResTime}
                      </StyledTableCell>
                      <StyledTableCell>
                        {item.home_page.pct2ResTime}
                      </StyledTableCell>
                      <StyledTableCell>
                        {item.home_page.pct1ResTime}
                      </StyledTableCell>
                      <StyledTableCell>
                        {item.home_page.minResTime}
                      </StyledTableCell>
                      <StyledTableCell>
                        {item.home_page.maxResTime}
                      </StyledTableCell>
                      <StyledTableCell>
                        {item.home_page.receivedKBytesPerSec}
                      </StyledTableCell>
                      {/* <StyledTableCell>{item.home_page.receivedKBytesPerSec}</StyledTableCell> */}
                      <StyledTableCell last>
                        {item.home_page.errorPct}
                      </StyledTableCell>
                      {/* Add other Home Page fields here */}
                    </TableRow>
                  )}
                </React.Fragment>
              ))
            : data?.map((item, index) => (
                <React.Fragment key={index}>
                  {/* Total row */}
                  {/* {item.Total && item.Total && (
                    <TableRow>
                      <StyledTableCell first colSpan={2}>{item.Total.transaction}</StyledTableCell>
                      <StyledTableCell>{item.Total.sample}</StyledTableCell>
                      <StyledTableCell>{item.Total.medianResTime}</StyledTableCell>
                      <StyledTableCell>{item.Total.sentKBytesPerSec}</StyledTableCell>
                      <StyledTableCell>{item.Total.pct3ResTime}</StyledTableCell>
                      <StyledTableCell>{item.Total.pct2ResTime}</StyledTableCell>
                      <StyledTableCell>{item.Total.pct1ResTime}</StyledTableCell>
                      <StyledTableCell>{item.Total.minResTime}</StyledTableCell>
                      <StyledTableCell>{item.Total.maxResTime}</StyledTableCell>
                      <StyledTableCell>{item.Total.receivedKBytesPerSec}</StyledTableCell>
                      <StyledTableCell last>{item.Total.errorPct}</StyledTableCell>
                    </TableRow>
                  )} */}

                  {/* Home Page row */}
                  {item.home_page && item.home_page && (
                    <TableRow>
                      <StyledTableCell first colSpan={2}>
                        {item.home_page.transaction}
                      </StyledTableCell>
                      <StyledTableCell>{item.home_page.sample}</StyledTableCell>
                      <StyledTableCell>
                        {item.home_page.medianResTime}
                      </StyledTableCell>
                      <StyledTableCell>
                        {item.home_page.sentKBytesPerSec}
                      </StyledTableCell>
                      <StyledTableCell>
                        {item.home_page.pct3ResTime}
                      </StyledTableCell>
                      <StyledTableCell>
                        {item.home_page.pct2ResTime}
                      </StyledTableCell>
                      <StyledTableCell>
                        {item.home_page.pct1ResTime}
                      </StyledTableCell>
                      <StyledTableCell>
                        {item.home_page.minResTime}
                      </StyledTableCell>
                      <StyledTableCell>
                        {item.home_page.maxResTime}
                      </StyledTableCell>
                      <StyledTableCell>
                        {item.home_page.receivedKBytesPerSec}
                      </StyledTableCell>
                      <StyledTableCell last>
                        {item.home_page.errorPct}
                      </StyledTableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))}
          {data &&
            data.transactions &&
            data.transactions.map((trans) =>
              trans ? ( // Check if trans is defined
                <TableRow key={trans.transaction}>
                  <StyledTableCell first colSpan={2}>
                    {trans.transaction}
                  </StyledTableCell>
                  <StyledTableCell>
                    {trans.sampleCount ? trans.sampleCount : null}
                  </StyledTableCell>
                  <StyledTableCell>
                    {typeof trans.medianResTime === "number"
                      ? trans.medianResTime.toFixed(2)
                      : null}
                  </StyledTableCell>
                  <StyledTableCell>
                    {typeof trans.sentKBytesPerSec === "number"
                      ? trans.sentKBytesPerSec.toFixed(2)
                      : null}
                  </StyledTableCell>
                  <StyledTableCell>
                    {typeof trans.pct3ResTime === "number"
                      ? trans.pct3ResTime.toFixed(2)
                      : null}
                  </StyledTableCell>
                  <StyledTableCell>
                    {typeof trans.pct2ResTime === "number"
                      ? trans.pct2ResTime.toFixed(2)
                      : null}
                  </StyledTableCell>
                  <StyledTableCell>
                    {typeof trans.pct1ResTime === "number"
                      ? trans.pct1ResTime.toFixed(2)
                      : null}
                  </StyledTableCell>
                  <StyledTableCell>
                    {typeof trans.minResTime === "number"
                      ? trans.minResTime.toFixed(2)
                      : null}
                  </StyledTableCell>
                  <StyledTableCell>
                    {typeof trans.maxResTime === "number"
                      ? trans.maxResTime.toFixed(2)
                      : null}
                  </StyledTableCell>
                  <StyledTableCell>
                    {typeof trans.receivedKBytesPerSec === "number"
                      ? trans.receivedKBytesPerSec.toFixed(2)
                      : null}
                  </StyledTableCell>
                  <StyledTableCell last>
                    {typeof trans.errorPct === "number"
                      ? trans.errorPct.toFixed(2)
                      : null}
                  </StyledTableCell>
                </TableRow>
              ) : null
            )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
