import React,{useState,useEffect} from "react";
import "../App.css"
const Base=()=>{
    const[post,setpost]=useState([]);
    const[count,setCount]=useState(1);
const Api=async()=>{
    if(count==1){
    const res=await fetch("https://api.github.com/search/repositories?q=created:>2017-10-22&sort=stars&order=desc")
    const data=await res.json();
    setpost(data.items);
}
else{
    let temp="https://api.github.com/search/repositories?q=created:>2017-10-22&sort=stars&order=desc&page="+count;
    const res=await fetch(temp)
    const data=await res.json();
    setpost(data.items);
}
}
useEffect(()=>{
    Api();
},[count])

const handleIC=()=>{
    setCount(count+1);
}
const handleDC=()=>{
    if(count>0){ 
    setCount(count-1);
    }
}
    return(
        <>
        <div>
            <div className="i5"><h3>Repository name</h3></div>
            <div className="i5"><h3>Repository description</h3></div>
             <div className="i5"><h3>Number of stars for the repo.</h3></div>
            <div className="i5"><h3>Number of issues for the repo.</h3></div>
            <div className="i5"><h3>avatar of the owner.</h3></div>
        </div>
        <div>
        {post.map((ele,i)=>{
            return(
                <>
                <div key={i}>
                <div className="i5">{ele.name}</div>
                <div className="i5">{ele.description}</div>
                <div className="i5">{ele.stargazers_count}</div>
                <div className="i5">{ele.open_issues_count}</div>
                <div className="i5"><img src={ele.owner.avatar_url} alt="img" className="img1"/></div>
                </div>
                </>
            )
        })}</div>
        <div>
            <button className="btn" onClick={handleDC}>Previous</button>
            <button className="btn" onClick={handleIC}>Next</button>
        </div>
        </>
    )
}
export default Base;