// ⚠️ REPLACE WITH YOUR DISCORD WEBHOOK URL
// Get your webhook from: Discord Server → Settings → Integrations → Webhooks
const DISCORD_WEBHOOK_URL = 'YOUR_DISCORD_WEBHOOK_URL_HERE';

let uploadedImageData = null;

// Navigation functions
function showNewspaperAds() {
    document.getElementById('landing-page').style.display = 'none';
    document.getElementById('newspaper-page').style.display = 'block';
    document.getElementById('billboard-page').style.display = 'none';
}

function showBillboards() {
    document.getElementById('landing-page').style.display = 'none';
    document.getElementById('newspaper-page').style.display = 'none';
    document.getElementById('billboard-page').style.display = 'block';
}

function backToHome() {
    document.getElementById('landing-page').style.display = 'block';
    document.getElementById('newspaper-page').style.display = 'none';
    document.getElementById('billboard-page').style.display = 'none';
    
    // Reset form if it was filled
    document.getElementById('advertisementForm').reset();
    document.getElementById('filePreview').style.display = 'none';
    uploadedImageData = null;
}

function handleFileUpload(e) {
    const file = e.target.files[0];
    if (file) {
        if (file.size > 5 * 1024 * 1024) {
            alert('File size must be less than 5MB');
            return;
        }

        const reader = new FileReader();
        reader.onload = function(event) {
            uploadedImageData = event.target.result;
            document.getElementById('previewImage').src = uploadedImageData;
            document.getElementById('fileName').textContent = file.name;
            document.getElementById('filePreview').style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
}

async function submitAdvertisement(e) {
    e.preventDefault();
    
    const submitBtn = document.getElementById('submitBtn');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';

    const application = {
        id: 'AD-' + Date.now(),
        type: 'Newspaper',
        businessName: document.getElementById('businessName').value,
        contactPerson: document.getElementById('contactPerson').value,
        email: document.getElementById('adEmail').value,
        phone: document.getElementById('adPhone').value,
        businessType: document.getElementById('businessType').value,
        adSize: document.getElementById('adSize').value,
        duration: document.getElementById('duration').value,
        content: document.getElementById('adContent').value,
        notes: document.getElementById('adNotes').value,
        image: uploadedImageData,
        status: 'pending',
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString()
    };

    // Save to localStorage
    const applications = JSON.parse(localStorage.getItem('tnma_applications') || '[]');
    applications.push(application);
    localStorage.setItem('tnma_applications', JSON.stringify(applications));

    // Send to Discord
    const discordSent = await sendToDiscord(application);

    if (discordSent) {
        showMessage('success', '✅ Application submitted successfully! We will contact you within 24 hours.');
    } else {
        showMessage('success', '✅ Application submitted! (Add Discord webhook to enable notifications)');
    }

    // Reset form
    document.getElementById('advertisementForm').reset();
    document.getElementById('filePreview').style.display = 'none';
    uploadedImageData = null;

    submitBtn.disabled = false;
    submitBtn.textContent = 'Submit Application';

    // Scroll to top to see success message
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

async function sendToDiscord(app) {
    // Check if webhook URL is configured
    if (!DISCORD_WEBHOOK_URL || DISCORD_WEBHOOK_URL === 'YOUR_DISCORD_WEBHOOK_URL_HERE') {
        console.warn('⚠️ Discord Webhook URL not configured. Please add your webhook URL in advertisement.js');
        return false;
    }

    // Create the embed message
    const embed = {
        title: "🎯 New Newspaper Advertisement Application",
        description: "A new business wants to advertise in TNMA Newspaper!",
        color: 65535, // Cyan color
        fields: [
            { name: "📋 Application ID", value: app.id, inline: true },
            { name: "🏢 Business Name", value: app.businessName, inline: true },
            { name: "👤 Contact Person", value: app.contactPerson, inline: true },
            { name: "📧 Email", value: app.email, inline: true },
            { name: "📞 Phone", value: app.phone, inline: true },
            { name: "🏪 Business Type", value: app.businessType, inline: true },
            { name: "📏 Advertisement Size", value: app.adSize, inline: false },
            { name: "⏱️ Duration", value: app.duration, inline: true },
            { name: "📝 Ad Content", value: app.content.length > 500 ? app.content.substring(0, 500) + '...' : app.content, inline: false }
        ],
        footer: {
            text: `Submitted on ${app.date} at ${app.time} | Powered by TG Solutions`,
            icon_url: "https://cdn-icons-png.flaticon.com/512/2917/2917995.png"
        },
        timestamp: new Date().toISOString()
    };

    // Add notes if provided
    if (app.notes && app.notes.trim()) {
        embed.fields.push({
            name: "📌 Additional Notes",
            value: app.notes.length > 500 ? app.notes.substring(0, 500) + '...' : app.notes,
            inline: false
        });
    }

    // Add image status
    if (app.image) {
        embed.fields.push({
            name: "🖼️ Image Attachment",
            value: "✅ Ad design/logo uploaded (stored in browser)",
            inline: false
        });
    }

    try {
        const response = await fetch(DISCORD_WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: "TNMA Ad Portal",
                avatar_url: "https://cdn-icons-png.flaticon.com/512/3387/3387940.png",
                embeds: [embed]
            })
        });

        if (response.ok) {
            console.log('✅ Discord notification sent successfully!');
            return true;
        } else {
            console.error('❌ Discord webhook failed:', response.status);
            return false;
        }
    } catch (error) {
        console.error('❌ Error sending to Discord:', error);
        return false;
    }
}

function showMessage(type, text) {
    const message = document.createElement('div');
    message.className = `message ${type}`;
    message.textContent = text;
    
    const container = document.querySelector('.container');
    container.insertBefore(message, container.firstChild);

    setTimeout(() => message.remove(), 5000);
}