function Barchart() {
    document.addEventListener("DOMContentLoaded", function () {
        // Bar chart
        new Chart(document.getElementById("chartjs-dashboard-bar"), {
            type: "bar",
            data: {
                labels: [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec",
                ],
                datasets: [
                    {
                        label: "Last year",
                        backgroundColor: window.theme.primary,
                        borderColor: window.theme.primary,
                        hoverBackgroundColor: window.theme.primary,
                        hoverBorderColor: window.theme.primary,
                        data: [54, 67, 41, 55, 62, 45, 55, 73, 60, 76, 48, 79],
                        barPercentage: 0.325,
                        categoryPercentage: 0.5,
                    },
                    {
                        label: "This year",
                        backgroundColor: window.theme["primary-light"],
                        borderColor: window.theme["primary-light"],
                        hoverBackgroundColor: window.theme["primary-light"],
                        hoverBorderColor: window.theme["primary-light"],
                        data: [69, 66, 24, 48, 52, 51, 44, 53, 62, 79, 51, 68],
                        barPercentage: 0.325,
                        categoryPercentage: 0.5,
                    },
                ],
            },
            options: {
                maintainAspectRatio: false,
                cornerRadius: 15,
                legend: {
                    display: false,
                },
                scales: {
                    yAxes: [
                        {
                            gridLines: {
                                display: false,
                            },
                            ticks: {
                                stepSize: 20,
                            },
                            stacked: true,
                        },
                    ],
                    xAxes: [
                        {
                            gridLines: {
                                color: "transparent",
                            },
                            stacked: true,
                        },
                    ],
                },
            },
        });
    });
}
// Barchart();

function Piechart() {
    document.addEventListener("DOMContentLoaded", function () {
        // Pie chart
        new Chart(document.getElementById("chartjs-dashboard-pie"), {
            type: "pie",
            data: {
                labels: ["Direct", "Affiliate", "E-mail", "Other"],
                datasets: [
                    {
                        data: [2602, 1253, 541, 1465],
                        backgroundColor: [
                            window.theme.primary,
                            window.theme.warning,
                            window.theme.danger,
                            "#E8EAED",
                        ],
                        borderWidth: 5,
                        borderColor: window.theme.white,
                    },
                ],
            },
            options: {
                responsive: !window.MSInputMethodContext,
                maintainAspectRatio: false,
                cutoutPercentage: 70,
                legend: {
                    display: false,
                },
            },
        });
    });
}

// Piechart();

function datetimepicker() {
    document.addEventListener("DOMContentLoaded", function () {
        $("#datetimepicker-dashboard").datetimepicker({
            inline: true,
            sideBySide: false,
            format: "L",
        });
    });
}
datetimepicker();

function DataTable() {
    // document.addEventListener("DOMContentLoaded", function () {
    //     $("#datatables-dashboard-projects").DataTable({
    //         pageLength: 10,
    //         lengthChange: true,
    //         bFilter: true,
    //         autoWidth: false,
    //     });
    // });
    document.addEventListener("DOMContentLoaded", function () {
        // Datatables Responsive
        $("#datatables-reponsive").DataTable({
            responsive: true,
        });
    });
}
DataTable();

function Select2() {
    document.addEventListener("DOMContentLoaded", function () {
        // Select2
        $(".select2").each(function () {
            $(this)
                .wrap('<div class="position-relative"></div>')
                .select2({
                    placeholder: "Please Select",
                    dropdownParent: $(this).parent(),
                });
        });
    });
}

Select2();
