'use client'
import { Box, Flex } from "@chakra-ui/react";
import { Bar, BarChart, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from "recharts";
import { PLAYER_COLORS } from '@/lib/playerColors';

const formatData = (wipes, players) => {
  const playerWipes = {}
  const playerColors = {}
  // generate player map
  players.map(player => {
    playerWipes[player.name] = 0
    playerColors[player.name] = player.color
  });
  playerWipes['none'] = 0
  playerColors['none'] = '#000000'
  wipes.map(wipe => wipe?.player ? playerWipes[wipe.player.name]++ : playerWipes['none']++);
  return Object.keys(playerWipes).map(key => ({player: key, wipes: playerWipes[key], color: playerColors[key]}));
} 

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  if (percent === 0) return <></>
  return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
  );
};

const WipeCharts = ({wipes, players}) => {
  const playersWithColors = players.map(player => {
    player.color = PLAYER_COLORS[player.name]
    return player
})
  let data = formatData(wipes, playersWithColors)
  // let data = null;
  // console.log(playersWithColors)
  // console.log(wipes)
  if (!data) return <>no data</>
  return (
    <Flex>
        <BarChart width={400} height={200} data={data}>
          <XAxis dataKey="player" fontSize={'8px'} />
          <YAxis fontSize={'8px'} allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="wipes">
            {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
          </Bar>
        </BarChart>
        <Box>
        <PieChart width={200} height={200}>
          <Pie 
            dataKey="wipes" 
            nameKey="player" 
            data={data} 
            fill="#8884d8" 
            labelLine={false}
            label={renderCustomizedLabel}
            >
              {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
            </Pie>
          <Tooltip />
        </PieChart>
        </Box>
      </Flex>
  )
}

export default WipeCharts