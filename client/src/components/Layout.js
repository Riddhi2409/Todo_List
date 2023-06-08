import React from 'react'
import CardGrid from './CardGrid'


function Layout({data,col}) {
  console.log()
  return (
    <div className={col ?'grid xl:grid-cols-4 lg:grid-cols-3 min-[445px]:grid-cols-2 gap-x-4 gap-y-8' : 'grid gap-2' }>
        {data.map((datas)=>(
          <div key={datas._id}>
            <CardGrid title={datas.title} description={datas.description} date={datas.date} time={datas.time} important={datas.important} completed={datas.completed} _id={datas._id} col={col}/>
            </div>
        ))}
    </div>
  )
}

export default Layout
