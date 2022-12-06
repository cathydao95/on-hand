from bs4 import BeautifulSoup
import requests

f = open('post.txt', 'w')

# urls = ['https://www.allrecipes.com/recipes/1058/fruits-and-vegetables/fruits/','https://www.allrecipes.com/recipes/1059/fruits-and-vegetables/vegetables/', 'https://www.allrecipes.com/recipes/15172/fruits-and-vegetables/mushrooms/', 'https://www.allrecipes.com/recipes/16930/fruits-and-vegetables/beans-and-peas/', 'https://www.allrecipes.com/recipes/1227/everyday-cooking/vegan/', 'https://www.allrecipes.com/recipes/14503/everyday-cooking/everyday-leftovers/', 'https://www.allrecipes.com/recipes/14787/everyday-cooking/make-ahead/', 'https://www.allrecipes.com/recipes/15050/everyday-cooking/cooking-for-one/', 'https://www.allrecipes.com/recipes/15063/everyday-cooking/family-friendly/', 'https://www.allrecipes.com/recipes/17881/main-dish/bowls/', 'https://www.allrecipes.com/recipes/76/appetizers-and-snacks/', 'https://www.allrecipes.com/recipes/17146/appetizers-and-snacks/snacks/', 'https://www.allrecipes.com/recipes/80/main-dish/', 'https://www.allrecipes.com/recipes/81/side-dish/', 'https://www.allrecipes.com/recipes/79/desserts/'  ]

# html_text=requests.get("https://www.allrecipes.com/recipes/").content

# soup=BeautifulSoup(html_text, 'lxml' )
# for link in soup.find_all('a', {'class':'comp mntl-card-list-items mntl-document-card mntl-card card card--no-image' }):
#     f.write(link['href'] + '\n')


urls = [ 'https://www.allrecipes.com/recipes/15050/everyday-cooking/cooking-for-one/', 'https://www.allrecipes.com/recipes/15063/everyday-cooking/family-friendly/', 'https://www.allrecipes.com/recipes/76/appetizers-and-snacks/', 'https://www.allrecipes.com/recipes/80/main-dish/' ]
for url in urls:
    html_text=requests.get(f'{url}').content
    soup=BeautifulSoup(html_text, 'lxml' )

    for link in soup.find_all('a', {'class':'comp mntl-card-list-items mntl-document-card mntl-card card card--no-image' }):
        f.write(link['href'] + '\n')



f.close()