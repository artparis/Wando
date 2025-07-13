interface CardColors {
  overlayColor: string;
  avatar: string;
  progressbar: string;
  username: string;
  text: string;
}

interface Card {
  background: string;
  color: CardColors;
  overlay: number;
}

interface User {
  id: string;
  avatar: string;
  username: string;
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.src = src;
    img.onload = () => resolve(img);
    img.onerror = reject;
  });
}

// Helper function to check if a string is a valid URL
function isValidUrl(string: string): boolean {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

// Helper function to draw rounded rectangle (polyfill for older browsers)
function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

export default function drawLevelingCard(
  ctx: CanvasRenderingContext2D,
  card: Card,
  user: User
): void {
  // Clear the canvas
  ctx.clearRect(0, 0, 467, 141)
  
  // Draw background
  if (isValidUrl(card.background)) {
    // If it's a URL, load the image
    loadImage(card.background).then((background) => {
      ctx.save();
      ctx.drawImage(background, 0, 0, 467, 141);
      drawOverlayAndContent(ctx, card, user);
      ctx.restore();
    }).catch((error) => {
      console.error('Failed to load background image:', error)
      // If image fails, draw with color background
      drawColorBackground(ctx, card, user);
    });
  } else {
    // If it's a color, draw directly
    drawColorBackground(ctx, card, user);
  }
}

function drawColorBackground(ctx: CanvasRenderingContext2D, card: Card, user: User): void {
  // Fill with background color
  ctx.fillStyle = card.background.startsWith('#') ? card.background : '#23272A';
  ctx.fillRect(0, 0, 467, 141);
  
  drawOverlayAndContent(ctx, card, user);
}

function drawOverlayAndContent(ctx: CanvasRenderingContext2D, card: Card, user: User): void {
  // Draw overlay
  ctx.fillStyle = card.color.overlayColor;
  ctx.globalAlpha = card.overlay;
  ctx.fillRect(17, 10, 433, 121);
  ctx.globalAlpha = 1;

  // Draw avatar
  drawAvatar(ctx, card, user);
  
  // Draw progress bar background
  ctx.fillStyle = "#3B3B3B";
  roundRect(ctx, 138, 90, 279, 25, 12.5);
  ctx.fill();
  
  // Draw progress bar fill
  ctx.fillStyle = card.color.progressbar;
  roundRect(ctx, 138, 90, 279 * (512/1024), 25, 12.5);
  ctx.fill();

  // Draw username
  ctx.fillStyle = card.color.username;
  ctx.font = "bold 20px Verdana";
  ctx.fillText(user.username, 145, 83);

  // Draw XP text
  ctx.fillStyle = card.color.text;
  ctx.font = "bold 13px Verdana";
  const xp = ctx.measureText("512");
  const totalXP = ctx.measureText("/ 1024 XP");
  ctx.fillText("512", ((420 - totalXP.width) - 6) - xp.width, 83);
  ctx.fillStyle = "#CACACA";
  ctx.fillText("/ 1024 XP", 420 - totalXP.width, 83);

  // Draw rank
  ctx.fillStyle = card.color.text;
  const rankText = ctx.measureText("Rank");
  const rank = ctx.measureText("#1");
  ctx.font = "20px Arial";
  ctx.fillText("Rank", (((310 - rank.width) - 20) - rankText.width), 42);
  ctx.font = "bold 27px Arial";
  ctx.fillText("#1", (310 - rank.width), 42);

  // Draw level
  ctx.fillStyle = card.color.progressbar;
  const levelText = ctx.measureText("Level");
  const level = ctx.measureText("#8");
  ctx.font = "20px Arial";
  ctx.fillText("Level", (((420 - level.width) + 10) - levelText.width), 42);
  ctx.font = "bold 27px Arial";
  ctx.fillText("#7", (420 - level.width), 42);
}

function drawAvatar(ctx: CanvasRenderingContext2D, card: Card, user: User): void {
  // Create a default avatar if the user avatar is not available
  const avatarUrl = user.avatar && user.avatar !== "default.png" 
    ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`
    : `https://cdn.discordapp.com/embed/avatars/${parseInt(user.id) % 5}.png`;

  loadImage(avatarUrl).then((avatar) => {
    ctx.save();
    // Draw avatar circle background
    ctx.beginPath();
    ctx.arc(84.5, 70.5, 44.5, 0, 2 * Math.PI);
    ctx.fillStyle = card.color.avatar;
    ctx.fill();
    
    // Clip for circular avatar
    ctx.beginPath();
    ctx.arc(85, 71.5, 39.5, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.clip();
    
    // Draw the avatar image
    ctx.drawImage(avatar, 46, 32, 79, 79);
    ctx.restore();
  }).catch((error) => {
    console.error('Failed to load avatar:', error)
    // If avatar fails to load, just draw the circle background
    ctx.beginPath();
    ctx.arc(84.5, 70.5, 44.5, 0, 2 * Math.PI);
    ctx.fillStyle = card.color.avatar;
    ctx.fill();
  });
}
