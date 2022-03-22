while getopts d:u: flag
do
    case "${flag}" in
        d) domain=${OPTARG};;
        u) domain=${OPTARG};;
        *) echo "Usage: ./fisherman.sh -d <subdomain>";read -p "Press enter to continue";exit 1;;
    esac
done
lt --port 8080 --subdomain ${domain} & node app.js && fg