# Natural Disasters Around World


![Logo](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGoJJBsuXLDEAUAk7qqQg-URz8Odn4BADnIA&usqp=CAU) 
# Description
The team explored the Natural Disaster occurences from around the world. The dataset used compiled each natural disaster in the EM-DAT (Emergency Events Database). To start using Pandas, we filtered the dataset only for natural disasters, deleted any unnecessary columns and converted dates to a usable format. From there, it was a matter of creating and save data files needed to final visualizations. We took advantage of Jupyter Notebook's interactive interface as well as Pandas and Matplotlib for quick visualizations and to get a sense of what is happening in the world. After the team decided on the final visualizations, team members started compiling HTML pages and the background JavaScript logic for the website. There are six webpages in total. We used a variety of JS libraries, including D3, Plotly, Chart.JS and Leaflet.

Once we got the website working locally, we began on building the Flask app script to render the HTML as well as deliver the correct datasets per webpage. Admittedly the Flask app script is cluttered and cumbersome to the eyes. Future iterations of this website will seek to de-cluttered the script and reduce the number of saved datasets. Before deployment, the team worked on the CSS and final styling of the website. A Punk band lead singer is only as good as their eyeliner, therefore the team wanted to make sure the website looked as pretty as possible. To further prepare for deployment, the team filled the Heroku database with our disaster data and played with the connection string to ensure the Flask app deliver the correct data.

Finally, the team created a cleaned up repository for Heroku deployment. You can view the [Disaster website](https://n-disaster.herokuapp.com/).

# Repository Description
In this repository, you will find two folders containing data files, one folder with Jupyter notebooks and one folder entitled Heroku. The two data folders in the repository's main directory can be ignored. The Jupyter Notebook folder holds notebooks for data gathering, cleaning and loading as well as one notebook named EDA used to quickly visualize with Pandas and Matplotlib. The Heroku folder contains three subsequent folders and the Flask App script. The data folder holds all the data files that were loaded into AWS and Heroku's database. The static folder holds the CSS and JavaScript code for the website, while the templates folder contains the HTML files. We created a separate [repository](https://github.com/nitchon/disasters) for Heroku to use for deployment with the requisite files, such as text files for requirements and runtime.


## Objectives
- Identify the areas on Earth that are most affected by natural disasters.
- Uncover any relationship between climate change and the earth's weather.
- Identify trends that uncover information predicting future disasters.
- Identify the total deaths that occur as a result of natural disasters.
- Visualize and present the data on natural disasters over the past century. 


**_The following criteria must be met in order for an event to be entered into the database:_**
  -    Deaths: 10 of more people deaths
  -    Affected: 100 or more people affected/injured/homeless.
  -    Declaration/international appeal: Declaration by the country of a state of emergency and/or an appeal for international assistance



## 🚀 Fun Facts

1) 	Between 2000 and 2012, natural disasters caused $1.7 trillion in damage and affected 2.9 billion people  

2)  Over 1/2 of the victims of both Hurricane Katrina and Hurricane Sandy were senior citizens over the age of 65. Work with seniors to create an emergency plan in case of a disaster.  

3)  Nearly 50% of the fatalities caused by natural disasters in 2012 were due to hydrological events like flooding or mass movements


# Project Status
While project week is over, our website is far from finished. After some helpful feedback from staff and instructors, we have targeted updates to improve the website. The first improvement involves the data analysis. While raw numbers are great, displaying and visualizing raw numbers may not give an accurate depiction. Taking the raw numbers of deaths for instance. With a large population, it make senses China suffers many deaths. But more interesting is the proportion of deaths of the overall population in a country. This would illuminate on which country is suffering the most in terms for deaths as a result of natural disasters. To that end, creating a control slider that would return deaths as a percentage of a country's population for that specific year is in the works.

Another revision to the visualizations includes creating an event listener/handler that would update legends on choropleth maps depending on which layer is selected. We were unable to figure it out before the deadline, but it would make the maps more comprehensible. In addition, scatter plots exploring GDP per capita/CO2 emissions per capita versus death rates could be a worthwhile endeavor for more conclusions.

The second improvement involves politics. We can sit here listing policies addressing climate change that we haven't all heard before, but the most concrete policy we can give is: vote. It does not help that a significant portion of the United States population believe climate change is not real.





## 🔗 Links

Jaleel Cole
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/jaleel-cole215/)

Kenneth Condit
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/ken-condit-402a6b203/)

Nigel Itchon
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/nitchon/)

Natalia Moreno Bautista
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/)

Howard Xu
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/)

Eric Zhu
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/)

## Acknowledgements

CRED & UCLouvain. (2022). EM-DAT [Dataset]. In International Disaster Database. https://public.emdat.be/
Hannah Ritchie and Max Roser (2014) - "Natural Disasters". Published online at OurWorldInData.org. Retrieved from: 'https://ourworldindata.org/natural-disasters' [Online Resource]  
The World Bank, World Development Indicators (2012). GNI per capita, Atlas method [Data file]. Retrieved from http://data.worldbank.org/indicator/NY.GNP.PCAP.CD  
The World Bank, World Development Indicators (2012). GDP per capita, Atlas method [Data file]. Retrieved from http://data.worldbank.org/indicator/NY.GDP.PCAP.CD  
The World Bank, World Development Indicators (2012). CO2 per capita, Atlas method [Data file]. Retrieved from http://data.worldbank.org/indicator/EN.ATM.CO2E.PC  
The World Bank, World Development Indicators (2012). Population, Atlas method [Data file]. Retrieved from http://data.worldbank.org/indicator/SP.POP.TOTL  
United Nations, Department of Economic and Social Affairs, Population Division (2022). World Population Prospects 2022, Online Edition
https://public.emdat.be/about
data.worldbank.orgdata.worldbank.org
GNI per capita, Atlas method (current US$) | Data  
GNI per capita, Atlas method (current US$) from The World Bank: Data  
data.worldbank.orgdata.worldbank.org  


