
if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <script_name>"
    exit 1
fi

scripts_folder="src/scripts"

if [ ! -f "$scripts_folder/$1.sh" ]; then
    echo "Error: Script '$1' not found in the '$scripts_folder' folder."
    exit 1
fi

echo "Enter arguments for script '$1':"
read -r arguments

bash "$scripts_folder/$1.sh" $arguments