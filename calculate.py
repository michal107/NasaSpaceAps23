import solarsystem
from datetime import datetime
import time as tm
import matplotlib.pyplot as plt
import math

start = tm.time_ns()


class Orbit:
    def __init__(self, name, longtitude, latitude, dist):
        self.name = name
        self.long = longtitude
        self.lat = latitude
        self.dist = dist

    def __repr__(self):
        return f"Orbit(name={self.name}, long={self.long}, lat={self.lat}, dist={self.dist})"


time = datetime.now()
H = solarsystem.Heliocentric(year=time.year, month=time.month, day=time.day, hour=time.hour, minute=time.minute)

planets = {name: Orbit(name, *values) for name, values in H.planets().items()}
planets = dict(list(planets.items())[:-4])

distance_multipliers = {
    'Mercury': 1,
    'Venus': 1,
    'Earth': 1,
    'Mars': 1,
    'Jupiter': 0.50,
    'Saturn': 0.30,
    'Uranus': 0.17,
    'Neptune': 0.13,
}

scaled_planets = {name: Orbit(name, orbit_obj.long, orbit_obj.lat, orbit_obj.dist * distance_multipliers.get(name, 1))
                  for name, orbit_obj in planets.items()}


# for planet, scaled_orbit_obj in planets.items():
#     print(scaled_orbit_obj)


def spherical_to_cartesian(distance, longtitude, latitude):
    """
    Convert spherical coordinates to cartesian.
    """
    long_rad = math.radians(longtitude)
    lat_rad = math.radians(latitude)

    x = distance * math.cos(lat_rad) * math.cos(long_rad)
    y = distance * math.cos(lat_rad) * math.sin(long_rad)
    z = distance * math.sin(lat_rad)

    return x, y, z


def convert_dict(planets_dict, should_plot=False):
    """
    Convert the spherical coordinates of planets to cartesian and plot them on a 2D plane.
    """
    # Convert and store cartesian coordinates
    cartesian_coords = {}
    for name, orbit in planets_dict.items():
        x, y, _ = spherical_to_cartesian(orbit.dist, orbit.long, orbit.lat)
        cartesian_coords[name] = (x, y)

    if should_plot:
        fig, ax = plt.subplots()
        for name, (x, y) in cartesian_coords.items():
            ax.scatter(x, y, label=name)
            ax.text(x, y, name)  # Label the point with the planet name

        ax.set_xlabel('X')
        ax.set_ylabel('Y')
        ax.set_title('Planetary Positions')
        ax.grid(True)
        ax.axhline(0, color='black', linewidth=0.5)
        ax.axvline(0, color='black', linewidth=0.5)
        ax.set_aspect('equal', 'box')
        plt.legend(loc="upper right")
        plt.xlim(-5, 5)
        plt.ylim(-5, 5)
        plt.savefig("plot.png")

    return cartesian_coords


cart_coords = convert_dict(scaled_planets)

stop = tm.time_ns()
print("{} sec.".format((stop-start)/1000000000))
