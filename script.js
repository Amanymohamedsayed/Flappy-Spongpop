let move_speed = 3,
  grativy = 0.5;
let spongebob = document.querySelector(".Spongebob");
let img = document.getElementById("Spongebob-1");
let sound_point = new Audio("sounds effect/point.mp3");
let sound_die = new Audio("sounds effect/die.mp3");
let spongebob_props = spongebob.getBoundingClientRect();
let background = document.querySelector(".background").getBoundingClientRect();
let score_val = document.querySelector(".score_val");
let message = document.querySelector(".message");
let score_title = document.querySelector(".score_title");
let game_state = "Start";
img.style.display = "none";
message.classList.add("messageStyle");
document.addEventListener("keydown", (e) => {
  if (e.key == "Enter" && game_state != "Play") {
    document.querySelectorAll(".pipe_sprite").forEach((e) => {
      e.remove();
    });
    img.style.display = "block";
    spongebob.style.top = "20vh";
    game_state = "Play";
    message.innerHTML = "";
    score_title.innerHTML = "Score : ";
    score_val.innerHTML = "0";
    message.classList.remove("messageStyle");
    play();
  }
});
function play() {
  function move() {
    if (game_state != "Play") return;

    let pipe_sprite = document.querySelectorAll(".pipe_sprite");
    pipe_sprite.forEach((element) => {
      let pipe_sprite_props = element.getBoundingClientRect();
      spongebob_props = spongebob.getBoundingClientRect();

      if (pipe_sprite_props.right <= 0) {
        element.remove();
      } else {
        if (
          spongebob_props.left <
            pipe_sprite_props.left + pipe_sprite_props.width &&
          spongebob_props.left + spongebob_props.width >
            pipe_sprite_props.left &&
          spongebob_props.top <
            pipe_sprite_props.top + pipe_sprite_props.height &&
          spongebob_props.top + spongebob_props.height > pipe_sprite_props.top
        ) {
          game_state = "End";
          message.innerHTML =
            "Game Over".fontcolor("red") + "<br>Press Enter To Restart";
          message.classList.add("messageStyle");
          img.style.display = "none";
          sound_die.play();
          return;
        } else {
          if (
            pipe_sprite_props.right < spongebob_props.left &&
            pipe_sprite_props.right + move_speed >= spongebob_props.left &&
            element.increase_score == "1"
          ) {
            score_val.innerHTML = +score_val.innerHTML + 1;
            sound_point.play();
          }
          element.style.left = pipe_sprite_props.left - move_speed + "px";
        }
      }
    });
    requestAnimationFrame(move);
  }
  requestAnimationFrame(move);

  let spongebob_dy = 0;
  function apply_gravity() {
    if (game_state != "Play") return;
    spongebob_dy = spongebob_dy + grativy;
    document.addEventListener("keydown", (e) => {
      if (e.key == "ArrowUp" || e.key == " ") {
        img.src = "images/Spongebob-2.png";
        spongebob_dy = -7.6;
      }
    });

    document.addEventListener("keyup", (e) => {
      if (e.key == "ArrowUp" || e.key == " ") {
        img.src = "images/Spongebob.png";
      }
    });

    if (
      spongebob_props.top <= 0 ||
      spongebob_props.bottom >= background.bottom
    ) {
      game_state = "End";
      message.style.left = "25vw";
      window.location.reload();
      message.classList.remove("messageStyle");
      return;
    }
    spongebob.style.top = spongebob_props.top + spongebob_dy + "px";
    spongebob_props = spongebob.getBoundingClientRect();
    requestAnimationFrame(apply_gravity);
  }
  requestAnimationFrame(apply_gravity);

  let pipe_seperation = 0;

  let pipe_gap = 35;

  function create_pipe() {
    if (game_state != "Play") return;

    if (pipe_seperation > 115) {
      pipe_seperation = 0;

      let pipe_posi = Math.floor(Math.random() * 43) + 8;
      let pipe_sprite_inv = document.createElement("div");
      pipe_sprite_inv.className = "pipe_sprite";
      pipe_sprite_inv.style.top = pipe_posi - 70 + "vh";
      pipe_sprite_inv.style.left = "100vw";

      document.body.appendChild(pipe_sprite_inv);
      let pipe_sprite = document.createElement("div");
      pipe_sprite.className = "pipe_sprite";
      pipe_sprite.style.top = pipe_posi + pipe_gap + "vh";
      pipe_sprite.style.left = "100vw";
      pipe_sprite.increase_score = "1";

      document.body.appendChild(pipe_sprite);
    }
    pipe_seperation++;
    requestAnimationFrame(create_pipe);
  }
  requestAnimationFrame(create_pipe);
}
