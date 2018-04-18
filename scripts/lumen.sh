#!/bin/bash
#noir 0;30 rouge 0;31 vert 0;32 jaune 0;33 bleu 0;34 rose 3;35 cyan 0;36 gris 0;37
#0 parametre par defaut 1 gras 4 souligner 5 clignotant 7 surligner

#Brown 0;33
cBROWN='\033[0;33m';
cRED='\033[0;31m';
cBLUE='\033[0;34m';
cCYAN='\033[0;36m';
cGREEN='\033[0;32m';
fGREY='\033[0;47m';
NC='\033[0m' # No Color

echo -e "${cGREEN}Initialisation du Script... vagrant.sh${NC}";
echo -e "${cBLUE}Vous etes dans `pwd` ${NC}";
pwdRoot=$(pwd);

#Installation de VirtualBox
nameVirtualBox="virtualbox";
read -p $'\e[33mVoulez vous installer Virtualbox Oui/non :\e[36m[1/2] [nomVersion] \e[0m' installVirtualBox nameVirtualBox;
if [ $installVirtualBox = 1 ]; then
    sudo apt-get install libcurl3 -y;
    sudo apt-get install $nameVirtualBox -y;
elif [ $installVirtualBox = 2 ]; then
    echo -e "${cBLUE}Installation annulée${NC}";
else
    echo -e "${cBLUE}Installation annulée${NC}";
fi

#Suppression de Vagrant
validationDeleteVagrant="0";
while [ $validationDeleteVagrant != 1 ]
do
  read -p $'\e[31mVoulez vous supprimer une Vagrant Oui/Non :\e[36m[1/2]\e[0m' deleteVagrant;
  if [ $deleteVagrant = 1 ]; then
      vagrant global-status

      validationID="0";
      while [ $validationID != 1 ]
      do
          read -p $'\e[33mVeuillez entrer \e[36m [idVagrant] \e[0m' deleteVagrant;
          read -p $'\e[33mEtes vous sure de votre choix : \e[34m '${deleteVagrant}$' \e[36m [1]\e[33m Oui \e[36m [2]\e[33m Changer : \e[0m' validationID;
      done
      vagrant destroy $deleteVagrant
  else
      echo -e "${cBLUE}Suppression annulée${NC}";
      validationDeleteVagrant="1";
  fi
done

#Installation de Vagrant
nameVagrant="vagrant";
read -p $'\e[33mVoulez vous installer Vagrant Oui/Non :\e[36m[1/2] [nomVersion] \e[0m' installVagrant nameVagrant;
if [ $installVagrant = 1 ]; then
    sudo apt-get install $nameVagrant;
elif [ $installVagrant = 2 ]; then
    echo -e "${cBLUE}Installation annulée${NC}";
else
    echo -e "${cBLUE}Installation annulée${NC}";
fi

#VAGRANT-------------------------------------------------------

#Récuperation de la box
read -p $'\e[33mVoulez vous telecharger la box laravel/homestead (1x par poste) Oui/Non :\e[36m[1/2] [nomVersion] \e[0m' downloadHomestead linkHomestead;
if [ $downloadHomestead = 1 ]; then
    vagrant box add laravel/homestead;
elif [ $downloadHomestead = 2 ]; then
    echo -e "${cBLUE}Telechargement annulée${NC}";
else
    echo -e "${cBLUE}Telechargement annulée${NC}";
fi
#vagrant box add laravel/homestead;
#vagrant box add laravel/homestead e05895ac-ae4f-43ca-b45e-c263a4cb2356

validationGitClone="0";

while [ $validationGitClone != 1 ]
do
    read -p $'\e[33mVeuillez entrer le chemin pour copier pour homestead.git \e[36m [1]\e[33m ~/Homestead :\e[36m [cheminCopie] \e[0m' cheminGitClone;
    read -p $'\e[33mEtes vous sure de votre choix : \e[34m '${cheminGitClone}$' \e[36m [1]\e[33m Oui \e[36m [2]\e[33m Changer : \e[0m' validationGitClone;
done

repository="https://github.com/laravel/homestead.git";
echo "$repository";
if [ cheminGitClone = 1 ]; then #valeur par defaut 1
    echo "1- ${cheminGitClone}";
    cheminGitClone="~/Homestead";
    echo "2- ${cheminGitClone}";
    git clone "$repository" "$cheminGitClone";
    #git clone https://github.com/laravel/homestead.git $cheminGitClone;
else #ajout du caractère d'echappement
    echo "3- ${cheminGitClone}";
    #cheminGitClone="/Homestest";
    #echo "4- $cheminGitClone";
    git clone "$repository" "$cheminGitClone";
fi

cd "$cheminGitClone";
echo -e "${cBLUE}Vous etes dans `pwd` ${NC}";

git checkout v7.1.2;
bash init.sh

# Choix de la modification du fichier
validationDossier="0";
validationChemin="0";
validationIP="0";

while [ $validationDossier != 1 ]
do
    read -p $'\e[33mVeuillez entrer une passerelle \e[36m [1]\e[33m ~/code \e[33m :\e[36m [dossierPasserelle] \e[0m' dossierPasserelle;
    read -p $'\e[33mEtes vous sure de votre choix : \e[34m '${dossierPasserelle}$' \e[36m [1]\e[33m Oui \e[36m [2]\e[33m Changer : \e[0m' validationDossier;
done

while [ $validationChemin != 1 ]
do
    read -p $'\e[33mVeuillez entrer une passerelle \e[36m [1]\e[33m /home/vagrant/code :\e[36m [lienPasserelle] \e[0m' cheminPasserelle;
    read -p $'\e[33mEtes vous sure de votre choix : \e[34m '${cheminPasserelle}$' \e[36m [1]\e[33m Oui \e[36m [2]\e[33m Changer : \e[0m' validationChemin;
done

while [ $validationIP != 1 ]
do
    read -p $'\e[33mVeuillez une adresse IP \e[36m [1]\e[33m 192.168.10.10 :\e[36m [ipVM] \e[0m' adresseIP;
    read -p $'\e[33mEtes vous sure de votre choix : \e[34m '${adresseIP}$' \e[36m [1]\e[33m Oui \e[36m [2]\e[33m Changer : \e[0m' validationIP;
done


#Vagrant Modification du dossier
if [ $dossierPasserelle = 1 ]; then #valeur par defaut 1
    dossierPasserelle="~/code";
    #changeDossier="s/..\/data/$dossierPasserelle/g Vagrantfile";
else #ajout du caractère d'echappement
    dossierPasserelle1=$pwdRoot"/"$dossierPasserelle;
    dossierPasserelle1=$(echo $dossierPasserelle1 | sed -e's=\/=\\\/=g');
    changeDossier="s/~\/code/$dossierPasserelle1/g Homestead.yaml";
fi

# Vagrant Modification de la passerelle
if [ $cheminPasserelle = 1 ]; then #valeur par defaut 1
    cheminPasserelle="/home/vagrant/code";
    #changeChemin="s/vagrant_data/$cheminPasserelle/g Vagrantfile";
else #ajout du caractère d'echappement
    cheminPasserelle=$(echo $cheminPasserelle | sed -e's=\/=\\\/=g');
    changeChemin="s/\/home\/vagrant\/code/$cheminPasserelle/g Homestead.yaml";
fi

cheminPublic="/lumen/public";
cheminPublic=$(echo $cheminPublic | sed -e's=\/=\\\/=g');
changePublic="s/\/public/$cheminPublic/g Homestead.yaml";

# Verification de la presence du dossier avant mkdir
cd ..;
#Creation de la passerelle
if [ ! -d $dossierPasserelle ]; then
    mkdir $dossierPasserelle;
    #mkdir $dossierPasserelle"/public";
    echo -e "${cBLUE}Creation du dossier $dossierPasserelle${NC}"

else
    echo -e "${cRED}Le dossier $dossierPasserelle existe déjà !${cNC}"
    read -p $'\e[36m[1]\e[33mSupprimer \e[36m[2]\e[33mIgnorer \e[36m[3]\e[33mQuitter le bash \e[0m' miniMenu;

    #Suppression puis creation de la passerelle
    if [ $miniMenu = 1 ]; then
        rm -rf $dossierPasserelle;
        mkdir $dossierPasserelle;
        echo -e "${cRED}Le dossier $dossierPasserelle a été supprimé${NC}";
    #On continue le script
    elif [ $miniMenu = 2 ]; then
        echo -e "${cBLUE}Ignorer le dossier $dossierPasserelle${NC}";
    #Fermeture du bash
    elif [ $miniMenu = 3 ]; then
        echo -e "${cRED}Fermeture du bash${NC}";
        exit 1;
    else
        echo -e "${cBLUE}Ignorer le dossier $dossierPasserelle${NC}";
    fi
fi

cd "$cheminGitClone";

if [ $adresseIP = 1 ]; then #valeur par defaut 1
    adressIP="192.168.10.10";
fi

changeIP="s/192.168.10.10/$adresseIP/g Homestead.yaml";

sed -i -e $changeDossier;
sed -i -e $changeChemin;
sed -i -e $changePublic;
sed -i -e $changeIP;


#CREATION DU DOSSIER DE PROVISION PUIS ECRITURE
echo -e "${cBLUE}Vous etes dans `pwd` ${NC}";

provision=$pwdRoot"/"$cheminGitClone"/provision";

#AJOUT PROVISION DANS LA LIGNE 26 DU FICHIER VAGRANTFILE
sed -i '26i\config.vm.provision "file", source: "../homestead.sql", destination: "/var/www/html/homestead.sql"\n' $pwdRoot"/"$cheminGitClone"/Vagrantfile"

#AJOUT PROVISION DANS LA LIGNE 27 DU FICHIER VAGRANTFILE
sed -i '27i\config.vm.provision "shell", path: "provision/install-tools.sh"\n' $pwdRoot"/"$cheminGitClone"/Vagrantfile";

#AJOUT PROVISION DANS LE BASH AFTER.SH
echo 'config.vm.provision "shell", path: "provision/install-tools.sh"' >> $pwdRoot"/"$cheminGitClone"/after.sh";

mkdir $provision; #/home/provision
touch $provision"/install-tools.sh";
echo 'echo "===== INSTALLING TOOLS"' >> $provision"/install-tools.sh";
echo 'sudo apt-get install -y vim git curl wget' >> $provision"/install-tools.sh";
echo 'cd /var/www/html' >> $provision"/install-tools.sh";
echo 'composer create-project --prefer-dist laravel/lumen' >> $provision"/install-tools.sh";
echo 'cd /var/www/html' >> $provision"/install-tools.sh";

#https://laravel.io/forum/05-21-2014-homestead-mysql-root-password
echo 'mysql -uroot -psecret homestead < homestead.sql' >> $provision"/install-tools.sh";

vagrant up;  #--provision
#vagrant reload --provision
