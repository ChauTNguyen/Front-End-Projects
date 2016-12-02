var enrollment_chart = c3.generate({
    bindto: '#enrollment-chart',
    data: {
        columns: [
            ['applied', 239, 308, 455, 639],
            ['admitted', 33, 43, 43, 47],
            ['enrolled', 24, 38, 39, 37]
        ],
        colors: {
            applied: 'black',
            admitted: 'green',
            enrolled: 'blue'
        }
    },
    axis: {
        x: {
            tick: {
                values: [0, 1, 2, 3]
            },
            type: 'category',
            categories: [2012, 2013, 2014, 2015]
        }
    },
    size: {
        height: 500
    }
});

var transfer_gpa = c3.generate({
    bindto: '#cs-transfer-gpa-chart',
    data: {
        columns: [
            ['GPA', 3.795]
        ],
        type: 'gauge'
    },
    gauge: {
        max: 4,
        label: {
            format: function(value, ratio) {
                return value;
            },
            show: false // to turn off the min/max labels.
        },
        //    min: 0, // 0 is default, //can handle negative min e.g. vacuum / voltage / current flow / rate of change
        //    max: 100, // 100 is default
        //    units: ' %',
        //    width: 39 // for adjusting arc thickness
    },
    color: {
        pattern: ['#FF0000', '#F97600', '#F6C600', '#60B044'], // the three color levels for the percentage values.
        threshold: {
            //            unit: 'value', // percentage is default
            //            max: 200, // 100 is default
            values: [1, 2, 3, 4]
        }
    },
    size: {
        height: 180
    }
});

var enrollments = c3.generate({
    bindto: '#cs-transfer-enrollments-chart',
    data: {
        // iris data from R
        columns: [
            ['Accepted', 47],
            ['Denied', 592],
        ],
        colors: {
            Accepted: 'green',
            Denied: 'red'
        },
        type: 'pie'
    },
    pie: {
        label: {
            format: function(value, ratio, id) {
                return value;
            }
        }
    },
    size: {
        height: 720
    }
});

var cs_undergrad = c3.generate({
    bindto: '#cs-undergrad-population-chart',
    data: {
        // iris data from R
        columns: [
            ['EECS', 1312],
            ['CS', 906],
        ],
        type: 'pie'
    },
    pie: {
        label: {
            format: function(value, ratio, id) {
                return value;
            }
        }
    },
    size: {
        height: 720
    }
});