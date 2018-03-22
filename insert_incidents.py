import pymongo
import csv
import datetime as dt

f = file("C:/Users/timothy.lanahan/Downloads/sfcrime.csv", "r")
reader = csv.DictReader(f)
crimes = []
for row in reader:

  date = row['date'].split('/')
  time = row['time'].split(':')

  d = dt.datetime(int(date[2][0:4]), int(date[0]), int(date[1]), int(time[0]), int(time[1]))

  crime = {"type": "Feature"}
  crime['geometry'] = {'type': 'Point', 'coordinates': [float(row['x']), float(row['y'])]}
  crime['properties'] = {
	'category': row['category'],
	'description': row['description'],
	'district': row['district'],
	'time': row['time'],
	'date': d,
	'incidentNum': row['incidentNum'],
	'address': row['address'],
	'resolution': row['resolution']
	}
  crimes.append(crime)

client = pymongo.MongoClient('localhost', 27099)

db = client.sfCrimeDB

db.incidents.insert(crimes)

client.close()
