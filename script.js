// Loading screen percentage update
window.addEventListener('load', function() {
    let percent = 0;
    const percentElement = document.getElementById('loading-percent');
    
    const interval = setInterval(() => {
        if (percent < 100) {
            percent += Math.random() * 30;
            if (percent > 100) percent = 100;
            percentElement.textContent = Math.floor(percent);
        } else {
            clearInterval(interval);
        }
    }, 200);
});

// Navigation function to switch between sections
function showSection(sectionId) {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
    
    // Reset services view when navigating away
    if (sectionId === 'services') {
        document.getElementById('services-main').style.display = 'block';
        document.getElementById('service-detail').style.display = 'none';
    }
}

// Apply job function - opens Google Form in new tab
function applyJob() {
    // Replace this URL with your actual Google Form link
    const googleFormURL = 'https://forms.gle/KDoLzwYm6Fy71gjr8';
    window.open(googleFormURL, '_blank');
}

// Show service detail
function showServiceDetail(service) {
    document.getElementById('services-main').style.display = 'none';
    document.getElementById('service-detail').style.display = 'block';
    
    const detailContent = document.getElementById('detail-content');
    
    const serviceDetails = {
        news: {
            title: '📰 News Coverage',
            content: `
                <div class="detail-box">
                    <h2>📰 News Coverage in Thalainagaram</h2>
                    <img src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&h=300&fit=crop" alt="News Coverage" class="detail-image">
                    
                    <h3>Breaking News Across the City</h3>
                    <p>At TNMA, we are the first on the scene when news breaks in Thalainagaram. Our dedicated team of reporters works around the clock to bring you the most accurate and timely coverage of events shaping our city.</p>
                    
                    <h3>What We Cover:</h3>
                    <ul>
                        <li><strong>Gang Activity & Crime:</strong> Gang wars, territory disputes, and criminal investigations</li>
                        <li><strong>Police Operations:</strong> LSPD raids, arrests, and law enforcement activities</li>
                        <li><strong>Business & Commerce:</strong> Business deals, shop openings, and market developments</li>
                        <li><strong>Robberies & Heists:</strong> Major theft operations and robbery attempts</li>
                        <li><strong>Street Racing:</strong> Illegal racing events and automotive culture</li>
                        <li><strong>VIP Coverage:</strong> Stories about prominent criminals, business moguls, and city figures</li>
                    </ul>
                    
                    <h3>Our Commitment to Journalism</h3>
                    <p>Every story we report is carefully researched and verified through our network of sources in the criminal underworld, law enforcement, and business communities. We maintain journalistic integrity while covering the most dangerous stories in Los Santos.</p>
                    
                    <p><strong>Recent Headlines:</strong></p>
                    <ul>
                        <li>"Downtown Diamond Heist - $2 Million Stolen"</li>
                        <li>"Gang Turf War Escalates Near Pillbox Hill"</li>
                        <li>"Major Drug Operation Busted by LSPD"</li>
                        <li>"Underground Street Racing Circuit Exposed"</li>
                    </ul>
                    
                    <p style="color: #00ffff; font-size: 20px; margin-top: 30px;"><em>"When crime hits the streets of Thalainagaram, TNMA is there."</em></p>
                </div>
            `
        },
        video: {
            title: '🎬 Video Production',
            content: `
                <div class="detail-box">
                    <h2>🎬 Video Production Services</h2>
                    <img src="https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=600&h=300&fit=crop" alt="Video Production" class="detail-image">
                    
                    <h3>Professional Broadcasting in TNRP</h3>
                    <p>Our state-of-the-art video production team creates compelling visual content for the Thalainagaram community. From live news broadcasts to documentary-style features, we bring stories to life through the power of video.</p>
                    
                    <h3>Services We Offer:</h3>
                    <ul>
                        <li><strong>Live News Broadcasts:</strong> Real-time coverage of breaking events across the city</li>
                        <li><strong>Documentary Production:</strong> In-depth video features exploring Thalainagaram's culture and issues</li>
                        <li><strong>Interview Shows:</strong> Sit-down conversations with community leaders and influencers</li>
                        <li><strong>Event Coverage:</strong> Professional filming of concerts, rallies, and public events</li>
                        <li><strong>Commercial Productions:</strong> High-quality ads for local businesses</li>
                        <li><strong>Investigative Reports:</strong> Video investigations uncovering important stories</li>
                    </ul>
                    
                    <h3>Why Choose TNMA Video?</h3>
                    <p>Our camera crew is equipped with the latest technology and trained to capture every angle of your story. Whether it's a high-speed police chase or a peaceful community gathering, we deliver professional, broadcast-quality footage that engages viewers and tells your story effectively.</p>
                    
                    <p style="color: #00ffff; font-size: 20px; margin-top: 30px;"><em>"Your story deserves to be seen. Let TNMA bring it to life."</em></p>
                </div>
            `
        },
        photo: {
            title: '📸 Photography Services',
            content: `
                <div class="detail-box">
                    <h2>📸 Photography Services</h2>
                    <img src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=600&h=300&fit=crop" alt="Photography" class="detail-image">
                    
                    <h3>Capturing Thalainagaram's Moments</h3>
                    <p>A picture is worth a thousand words, and at TNMA, our photographers specialize in capturing the decisive moments that define Thalainagaram's story. From crime scenes to celebrations, we document it all.</p>
                    
                    <h3>Photography Specialties:</h3>
                    <ul>
                        <li><strong>Photojournalism:</strong> On-scene documentation of breaking news and events</li>
                        <li><strong>Portrait Photography:</strong> Professional headshots and character portraits for roleplay</li>
                        <li><strong>Event Photography:</strong> Coverage of weddings, parties, and community gatherings</li>
                        <li><strong>Commercial Photography:</strong> Product shots and promotional images for businesses</li>
                        <li><strong>Architectural Photography:</strong> Showcasing Thalainagaram's buildings and landmarks</li>
                        <li><strong>Action Photography:</strong> Dynamic shots of police operations, sports, and more</li>
                    </ul>
                    
                    <h3>The TNMA Difference</h3>
                    <p>Our photographers don't just take pictures – they tell visual stories. Every image captures emotion, context, and truth, ensuring that when people see a TNMA photograph, they understand the full story behind it.</p>
                    
                    <p style="color: #00ffff; font-size: 20px; margin-top: 30px;"><em>"Every moment in Thalainagaram deserves to be remembered."</em></p>
                </div>
            `
        },
        ad: {
            title: '📢 Advertisement',
            content: `
                <div class="detail-box">
                    <h2>📢 Advertisement Solutions</h2>
                    <img src="https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=600&h=300&fit=crop" alt="Advertisement" class="detail-image">
                    
                    <h3>Promote Your Business in Thalainagaram</h3>
                    <p>Want to reach the streets of Thalainagaram? TNMA's advertising solutions help businesses, criminal organizations, and entrepreneurs get their message in front of the right audience across Thalainagaram and beyond.</p>
                    
                    <h3>Advertising Options:</h3>
                    <ul>
                        <li><strong>Billboard Campaigns:</strong> High-visibility placements across the city streets</li>
                        <li><strong>Radio Commercials:</strong> Broadcast ads on TNMA news programs</li>
                        <li><strong>Print Ads:</strong> Featured spots in our daily publications</li>
                        <li><strong>Social Media Promotion:</strong> Targeted campaigns on TNMA's platforms</li>
                        <li><strong>Sponsored Stories:</strong> Branded content and features</li>
                        <li><strong>Event Sponsorships:</strong> Brand visibility at major city events and street races</li>
                    </ul>
                    
                    <h3>Reach Your Audience</h3>
                    <p>Whether you're running a nightclub, selling weapons, operating a business front, or promoting legitimate enterprises, TNMA has the perfect advertising package for you. Our reach extends across the entire criminal and business networks of Thalainagaram.</p>
                    
                    <p><strong>Success Stories:</strong> We've helped numerous businesses and organizations establish their brand presence and increase customer engagement in the city.</p>
                    
                    <p style="color: #00ffff; font-size: 20px; margin-top: 30px;"><em>"Make your mark on Thalainagaram. Advertise with TNMA."</em></p>
                </div>
            `
        },
        live: {
            title: '🎙️ Live Reporting',
            content: `
                <div class="detail-box">
                    <h2>🎙️ Live Reporting</h2>
                    <img src="https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?w=600&h=300&fit=crop" alt="Live Reporting" class="detail-image">
                    
                    <h3>Real-Time News from the Streets</h3>
                    <p>When news breaks in Thalainagaram, TNMA goes live. Our field reporters are always ready to bring you instant updates from wherever the action is happening in the TNRP world.</p>
                    
                    <h3>Live Coverage Includes:</h3>
                    <ul>
                        <li><strong>Breaking News:</strong> Immediate coverage of major incidents as they unfold</li>
                        <li><strong>Police Operations:</strong> Live updates during ongoing law enforcement activities</li>
                        <li><strong>Press Conferences:</strong> Real-time broadcasting of official announcements</li>
                        <li><strong>Public Events:</strong> Live coverage of festivals, protests, and gatherings</li>
                        <li><strong>Emergency Situations:</strong> On-scene reporting during fires, accidents, and disasters</li>
                        <li><strong>Sports & Entertainment:</strong> Live coverage of races, competitions, and shows</li>
                    </ul>
                    
                    <h3>Always On Location</h3>
                    <p>Our reporters carry mobile broadcast equipment and are authorized to report from any location in Thalainagaram. We coordinate with TPD, medical services, and city officials to bring you safe, accurate, and immediate coverage of developing situations.</p>
                    
                    <p><strong>Recent Live Broadcasts:</strong></p>
                    <ul>
                        <li>Downtown Bank Robbery - Live Standoff Coverage</li>
                        <li>Mayor's State of the City Address</li>
                        <li>Annual Thalainagaram Street Festival</li>
                        <li>High-Speed Chase Through Downtown</li>
                    </ul>
                    
                    <p style="color: #00ffff; font-size: 20px; margin-top: 30px;"><em>"When it's happening now, TNMA is there live."</em></p>
                </div>
            `
        },
        content: {
            title: '✍️ Content Creation',
            content: `
                <div class="detail-box">
                    <h2>✍️ Content Creation</h2>
                    <img src="https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&h=300&fit=crop" alt="Content Creation" class="detail-image">
                    
                    <h3>Compelling Stories for Thalainagaram</h3>
                    <p>Beyond breaking news, TNMA creates in-depth articles, features, and multimedia content that explores the heart and soul of Thalainagaram and its people in the TNRP universe.</p>
                    
                    <h3>Content We Create:</h3>
                    <ul>
                        <li><strong>Feature Articles:</strong> Long-form journalism exploring important topics</li>
                        <li><strong>Character Profiles:</strong> In-depth looks at notable residents of Thalainagaram</li>
                        <li><strong>Editorial Pieces:</strong> Opinion columns on city issues and policies</li>
                        <li><strong>Investigative Reports:</strong> Deep-dive journalism uncovering hidden stories</li>
                        <li><strong>Community Spotlights:</strong> Celebrating local businesses and organizations</li>
                        <li><strong>Lifestyle Content:</strong> Guides, reviews, and cultural coverage</li>
                        <li><strong>Historical Pieces:</strong> Exploring Thalainagaram's rich backstory</li>
                    </ul>
                    
                    <h3>Quality Storytelling</h3>
                    <p>Our writers are skilled storytellers who understand the TNRP community. We conduct thorough research, multiple interviews, and fact-checking to ensure every piece of content we publish meets the highest journalistic standards.</p>
                    
                    <p><strong>Popular Series:</strong></p>
                    <ul>
                        <li>"Behind the Badge" - Weekly features on TPD officers</li>
                        <li>"Street Stories" - Profiles of everyday citizens</li>
                        <li>"Business Spotlight" - Showcasing local enterprises</li>
                        <li>"The Thalainagaram Chronicles" - Historical deep-dives</li>
                    </ul>
                    
                    <p style="color: #00ffff; font-size: 20px; margin-top: 30px;"><em>"Every person in Thalainagaram has a story. We tell them all."</em></p>
                </div>
            `
        },
        events: {
            title: '🎪 Event Coverage',
            content: `
                <div class="detail-box">
                    <h2>🎪 Event Coverage</h2>
                    <img src="https://images.unsplash.com/photo-1540575467063-178f50002cbc?w=600&h=300&fit=crop" alt="Event Coverage" class="detail-image">
                    
                    <h3>Professional Coverage of Los Santos Events</h3>
                    <p>From underground street racing events to major gang gatherings, TNMA provides comprehensive coverage that captures the excitement, energy, and significance of every major occurrence in Los Santos.</p>
                    
                    <h3>Events We Cover:</h3>
                    <ul>
                        <li><strong>Street Racing Events:</strong> Illegal races and automotive competitions</li>
                        <li><strong>Business Events:</strong> Club openings, business deals, and high-profile meetings</li>
                        <li><strong>Gang Events:</strong> Gang wars, territory disputes, and meetings</li>
                        <li><strong>Criminal Operations:</strong> Major heists and criminal activities</li>
                        <li><strong>Public Gatherings:</strong> Protests, demonstrations, and street events</li>
                        <li><strong>VIP Celebrations:</strong> Parties, celebrations, and exclusive events</li>
                        <li><strong>Police Operations:</strong> Raids, arrests, and law enforcement spectacles</li>
                    </ul>
                    
                    <h3>Our Event Coverage Services:</h3>
                    <p>We provide multi-platform coverage including live photography, video documentation, live updates, and detailed written reports. Our team works before, during, and after events to ensure complete documentation of the action.</p>
                    
                    <h3>What You Get:</h3>
                    <ul>
                        <li><strong>Professional Photography:</strong> High-quality images suitable for news and promotion</li>
                        <li><strong>Video Highlights:</strong> Edited video compilations of key moments</li>
                        <li><strong>Live Updates:</strong> Real-time social media and broadcast coverage</li>
                        <li><strong>Detailed Articles:</strong> Comprehensive written reports and analysis</li>
                        <li><strong>Photo Archive:</strong> Complete collection of all event images</li>
                        <li><strong>Press Releases:</strong> Professional announcements for media distribution</li>
                    </ul>
                    
                    <p><strong>Recent Events Covered:</strong></p>
                    <ul>
                        <li>Downtown Street Race Championship - 50K Prize</li>
                        <li>Nightclub Grand Opening with Gang Leaders</li>
                        <li>Major DEA Drug Bust Operation</li>
                        <li>Underground Casino High-Stakes Poker Tournament</li>
                    </ul>
                    
                    <p style="color: #00ffff; font-size: 20px; margin-top: 30px;"><em>"From streets to penthouse - TNMA covers it all."</em></p>
                </div>
            `
        }
    };
    
    if (serviceDetails[service]) {
        detailContent.innerHTML = serviceDetails[service].content;
    }
}

// Back to services
function backToServices() {
    document.getElementById('services-main').style.display = 'block';
    document.getElementById('service-detail').style.display = 'none';
}
