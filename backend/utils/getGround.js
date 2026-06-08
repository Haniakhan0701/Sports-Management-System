// utils/getGround.js
const getGround = (sport, category) => {
  const isWomens = category === "Women's";
  switch (sport) {
    case "Cricket":
    case "Football":
      return isWomens
        ? "Maryam Hostel Main Ground"
        : "Main Ground & Ali Hall Hostel Ground";
    case "100m Race":
    case "4×100m Relay":
      return "Staff Colony No. 2 — Race Track";
    case "Badminton":
      return "Sports Complex — Indoor Courts";
    case "Tug of War":
    case "Dodge Ball":
    case "Bottle Spin Chase":
      return "Open Area";
    default:
      return "TBD";
  }
};

module.exports = { getGround };