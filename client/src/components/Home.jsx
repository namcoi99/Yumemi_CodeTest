import React, { useEffect, useState } from 'react'
import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts'
import axios from '../axios'
import randDarkColor from '../helpers/util'

const Home = () => {
    const [prefectures, setPrefectures] = useState([])
    const [chartData, setChartData] = useState([])

    // Call API to get list of prefectures
    const getPrefectures = () => {
        axios
            .get('prefectures', {
                headers: {
                    'X-API-KEY': localStorage.getItem('apiKey'),
                },
            })
            .then((response) => {
                console.log(response)
                if (!response.data.message) {
                    const prefList = response.data.result
                    // Add a selected attribute to each prefecture item to know whether it is selected or not
                    prefList.forEach((item) => {
                        item.selected = false
                    })
                    setPrefectures(prefList)
                } else {
                    alert('APIキーは使用できません')
                    localStorage.removeItem('apiKey')
                    window.location.href = '/'
                }
            })
            .catch((error) => console.log(error))
    }

    const checkApiKey = () => {
        if (!localStorage.getItem('apiKey')) {
            window.location.href = '/'
        }
    }

    useEffect(() => {
        checkApiKey()
        getPrefectures()
    }, [])

    // Add received population data to show on line chart
    const addChartData = (pref, popPerYear) => {
        const data = [...chartData]
        for (let i = 0; i < popPerYear.length; i += 1) {
            data[i] = {
                ...data[i],
                year: popPerYear[i].year,
                [pref.prefName]: popPerYear[i].value,
            }
        }
        setChartData(data)
    }

    // Call API to get population per year by prefecture
    const getPopulationByPref = (pref) => {
        axios
            .get(
                `population/composition/perYear?cityCode=-&prefCode=${pref.prefCode}`,
                {
                    headers: {
                        'X-API-KEY': localStorage.getItem('apiKey'),
                    },
                }
            )
            .then((response) => {
                const population = response.data.result.data
                const totalPopulation = population.find(
                    (item) => item.label === '総人口'
                ).data
                // Sort array of total population by year ascending
                totalPopulation.sort((a, b) => a.year - b.year)

                addChartData(pref, totalPopulation)
            })
            .catch((error) => console.log(error))
    }

    // Set selected attribute to true when prefecture is selected, ortherwise false
    const handleSelectPref = (pref) => {
        const findPref = prefectures.find((item) => item === pref)
        findPref.selected = !findPref.selected
        // If selected, call API to get population then add to chart data
        if (findPref.selected) {
            getPopulationByPref(findPref)
        } else {
            // If selection canceled, remove population of that prefecture from chart data
            const newChartData = [...chartData]
            newChartData.forEach((item) => delete item[findPref.prefName])
            setChartData(newChartData)
        }
    }

    // Component to show list of prefectures
    const prefecturesList = prefectures.map((item) => (
        <div className="app-prefecture-item" key={item.prefCode}>
            <label htmlFor={item.prefCode}>
                <input
                    type="checkbox"
                    name={item.prefName}
                    id={item.prefCode}
                    onClick={() => handleSelectPref(item)}
                />
                {item.prefName}
            </label>
        </div>
    ))

    // Component to show all lines of selected prefectures, each line has random color
    const prefLines = prefectures
        .filter((pref) => pref.selected)
        .map((pref) => (
            <Line
                key={pref.prefCode}
                type="monotone"
                dataKey={pref.prefName}
                stroke={randDarkColor()}
            />
        ))

    const renderLineChart = (
        <LineChart
            data={chartData}
            margin={{
                top: 40,
                bottom: 40,
                left: 40,
                right: 40,
            }}
        >
            {prefLines}
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis
                padding={{ right: 60 }}
                dataKey="year"
                label={{
                    value: '年度',
                    position: 'insideBottomRight',
                }}
            />
            <YAxis
                padding={{ top: 40 }}
                label={{
                    value: '人口数',
                    position: 'insideTopLeft',
                }}
            />
            <Tooltip />
            <Legend verticalAlign="top" align="right" layout="vertical" />
        </LineChart>
    )

    return (
        <div className="container">
            <h1 className="app-title">都道府県の人口数</h1>
            <h2>都道府県</h2>
            <div className="app-prefecture-list">{prefecturesList}</div>
            {prefectures.find((pref) => pref.selected) ? (
                <div className="app-linechart">
                    <ResponsiveContainer width="100%" height="100%">
                        {renderLineChart}
                    </ResponsiveContainer>
                </div>
            ) : (
                <div style={{ fontStyle: 'italic' }}>
                    *都道府県を選択してください。*
                </div>
            )}
        </div>
    )
}

export default Home
