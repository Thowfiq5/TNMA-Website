// Discord Webhook URL
const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1456613398044344463/OVomRV3lZHDi6T_yg3qOJj4FMx755Miprb7SZsqTQmWob2nyXn32AuDjOe4Dcnjiblyi';

let uploadedImageFile = null;

// Set current year in footer
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('currentYear').textContent = new Date().getFullYear();
});

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

    document.getElementById('advertisementForm').reset();
    document.getElementById('filePreview').style.display = 'none';
    uploadedImageFile = null;
}

function handleFileUpload(e) {
    const file = e.target.files[0];
    if (file) {
        if (file.size > 20 * 1024 * 1024) {
            alert('File size must be less than 20MB');
            e.target.value = '';
            return;
        }

        uploadedImageFile = file;

        // Show preview for images only
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function (event) {
                document.getElementById('previewImage').src = event.target.result;
                document.getElementById('previewImage').style.display = 'block';
                document.getElementById('fileName').textContent = file.name;
                document.getElementById('filePreview').style.display = 'block';
            };
            reader.readAsDataURL(file);
        } else {
            document.getElementById('previewImage').style.display = 'none';
            document.getElementById('fileName').textContent = file.name;
            document.getElementById('filePreview').style.display = 'block';
        }
    }
}

async function submitAdvertisement(e) {
    e.preventDefault();

    const submitBtn = document.getElementById('submitBtn');
    submitBtn.disabled = true;
    submitBtn.textContent = '⏳ Uploading...';

    const application = {
        id: 'AD-' + Date.now(),
        type: 'Newspaper',
        inGameName: document.getElementById('inGameName').value,
        inGamePhone: document.getElementById('inGamePhone').value,
        discordName: document.getElementById('discordName').value,
        businessName: document.getElementById('businessName').value,
        adSize: document.getElementById('adSize').value,
        duration: document.getElementById('duration').value + ' days',
        content: document.getElementById('adContent').value,
        notes: document.getElementById('adNotes').value,
        imageFile: uploadedImageFile,
        status: 'pending',
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString()
    };

    // Send to Discord with timeout
    const discordSent = await sendToDiscordWithTimeout(application, 30000); // 30 second timeout

    if (discordSent) {
        showMessage('success', '✅ Application submitted successfully! We will contact you within 24 hours.');
    } else {
        showMessage('error', '⚠️ Submission may have failed. Please contact us directly or try again.');
    }

    // Reset form
    document.getElementById('advertisementForm').reset();
    document.getElementById('filePreview').style.display = 'none';
    uploadedImageFile = null;

    submitBtn.disabled = false;
    submitBtn.textContent = 'Submit Application';

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

async function sendToDiscordWithTimeout(app, timeout) {
    return Promise.race([
        sendToDiscord(app),
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Upload timeout')), timeout)
        )
    ]).catch(error => {
        console.error('❌ Error or timeout:', error);
        return false;
    });
}

async function sendToDiscord(app) {
    const currentYear = new Date().getFullYear();

    const embed = {
        title: "🔔 New Newspaper Advertisement Application",
        description: "A new business wants to advertise in TNMA Newspaper!",
        color: 65535,
        fields: [
            { name: "Application ID", value: app.id, inline: true },
            { name: "In-Game Name", value: app.inGameName, inline: true },
            { name: "In-Game Phone", value: app.inGamePhone, inline: true },
            { name: "Discord Name", value: app.discordName, inline: true },
            { name: "Business Name", value: app.businessName, inline: true },
            { name: "Ad Size", value: app.adSize, inline: true },
            { name: "Duration", value: app.duration, inline: true },
            { name: "Ad Content", value: app.content.length > 500 ? app.content.substring(0, 500) + '...' : app.content, inline: false }
        ],
        footer: {
            text: `© ${currentYear} TNMA | Powered By TG Solutions |Submitted on ${app.date} at ${app.time}`,
            icon_url: "https://i.imgur.com/YOUR_TNMA_LOGO.png"
        },
        timestamp: new Date().toISOString()
    };

    if (app.notes && app.notes.trim()) {
        embed.fields.push({
            name: "📌 Additional Notes",
            value: app.notes.length > 500 ? app.notes.substring(0, 500) + '...' : app.notes,
            inline: false
        });
    }

    // Add image to embed if uploaded
    if (app.imageFile) {
        embed.image = {
            url: "attachment://ad_design.png"
        };
    }

    try {
        const formData = new FormData();

        const payload = {
            content: "<@&1455460565173407825>",
            username: "TNMA Advertisement",
            embeds: [embed]
        };

        formData.append('payload_json', JSON.stringify(payload));

        // Add file if exists
        if (app.imageFile) {
            formData.append('file', app.imageFile, app.imageFile.name);
        }

        const response = await fetch(DISCORD_WEBHOOK_URL, {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            console.log('✅ Discord notification sent successfully!');
            return true;
        } else {
            console.error('❌ Discord webhook failed:', response.status);
            const errorText = await response.text();
            console.error('Error details:', errorText);
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

// Support Popup Functions
function showSupportPopup() {
    const popup = document.getElementById('supportPopup');
    popup.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

function closeSupportPopup(e) {
    if (e.target === e.currentTarget || e.target.classList.contains('close-modal')) {
        const popup = document.getElementById('supportPopup');
        popup.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
    }
}

function copyDiscordUsername() {
    const username = document.getElementById('discordUsername').textContent;
    navigator.clipboard.writeText(username).then(() => {
        const tooltip = document.getElementById('copyTooltip');
        const originalText = tooltip.textContent;

        tooltip.textContent = "Copied!";
        tooltip.classList.add('show');

        setTimeout(() => {
            tooltip.classList.remove('show');
            setTimeout(() => {
                tooltip.textContent = originalText;
            }, 300);
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
}
