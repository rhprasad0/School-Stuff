# Ryan Prasad
# GEOG 485 Spring 2 2022
# Lesson 1 Assignment - Contours of Fox Lake DEM
#
# This is simple demonstration of arcpy that creates contour lines for the provided
# Fox Lake DEM file.
#
# Going above and beyond, this bloated script does the following:
# 1 - Generates descriptive statistics for the input raster
# 2 - Counts the number of contour lines created
# 3 - Generates a shaded relief raster based on the input raster


import arcpy
import math
from arcpy.sa import *


# Specify input parameters for Contour tool
inRaster = r"C:\Users\rhpra\OneDrive\School\GEOG485\Lesson1\data\foxlake"
outFeature = r"C:\Users\rhpra\OneDrive\School\GEOG485\Lesson1\foxlake_contours.shp"
contourInterval = 25
baseContour = 0

# Specify input parameters for ShadedRelief
azimuth = 315
altitude = 45
outRaster = r"C:\Users\rhpra\OneDrive\School\GEOG485\Lesson1\foxlake_relief.tif"

# Print the maximum, minimum, mean, and standard deviation of the elevations
raster = Raster(inRaster)
print("Descriptive statistics for input raster:")
print("Maximum: {}, Minimum: {}, Average: {}, Standard Deviation: {}".format(
    math.floor(raster.maximum),
    math.floor(raster.minimum),
    math.floor(raster.mean),
    math.floor(raster.standardDeviation)
))
print()


# Check out Spatial Analyst
arcpy.CheckOutExtension("Spatial")

# Make the contours of the DEM using the Contour tool
try:
    arcpy.sa.Contour(inRaster, outFeature, contourInterval, baseContour)

    # Print number of contours created
    print("{} contours created.".format(arcpy.management.GetCount(outFeature)))

except BaseException:
    arcpy.AddError("Contour of input DEM did not successfully complete.")
    raise

print()

# Generate shaded relief. I decided against one try/catch block.
try:
    shadedRelief = ShadedRelief(inRaster, azimuth, altitude)
    shadedRelief.save(outRaster)

except BaseException:
    arcpy.AddError("Unable to generate shaded relief.")
    raise

# Print messages to console
print(arcpy.GetMessages())

# Check in Spatial Analyst
arcpy.CheckInExtension("Spatial")
