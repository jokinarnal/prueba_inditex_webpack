import React from "react";
import {
  useLoaderData,
	Link
} from "react-router-dom";

export const PodcastSidebar = ({...props}) => {
        
	const data = useLoaderData();
	
	return(
		<div className="podcast-sidebar-container">
			<div className="podcast-sidebar box-shadow">
				<Link to={`/podcast/${props.podcastInfo.trackId}`}>
					<img className="podcast-sidebar-img" src={props.podcastInfo.artworkUrl600} alt={props.podcastInfo.artistName} width="100" height="100"/>
				</Link>
				<div className="podcast-sidebar-content">
					<p className="podcast-sidebar-item">
						<Link to={`/podcast/${props.podcastInfo.trackId}`}><strong className="podcast-sidebar-name">{props.podcastInfo.collectionName}</strong></Link>
						<span className="podcast-sidebar-artist">by <Link to={`/podcast/${props.podcastInfo.trackId}`}>{props.podcastInfo.artistName}</Link></span>
					</p>
					{ props.podcastInfo.hasOwnProperty('description') && 
						<p className="podcast-sidebar-item">
							<strong className="podcast-sidebar-name">Description</strong>
							<span className="podcast-sidebar-artist">{props.podcastInfo.description}</span>
						</p> }				
				</div>
			</div>	
		</div>
	);
}