remove-item -R -Force .next
remove-item -R -Force node_modules

# yarn --dev
npm i -d

npm run dev
